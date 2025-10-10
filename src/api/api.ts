/* eslint-disable @typescript-eslint/no-explicit-any */
import useHista from '../store/store';
import Client, { APIError, authentication, ClientOptions, Environment, Local } from './generatedApi';


const getStageURL = (): string => {
    const hostname = new URL(window.location.href).hostname
    if (hostname.includes('hista-ui-git')) {
        return Environment('staging')
    } else {
        return Environment('prod')
    }
}

const baseUrl = import.meta.env.MODE === 'test'
    ? 'http://localhost:4444'
    : import.meta.env.PROD
        ? getStageURL()
        : Local


const options: ClientOptions = {
    fetcher: (input: RequestInfo | URL, init?: RequestInit) => fetch(input, { ...init, ...{ credentials: 'include' } }),
}


const baseClient = new Client(baseUrl, options)
export const authApi = baseClient.authentication

// Remove first argument from function type
type DropFirstArg<F> = F extends (first: any, ...rest: infer R) => infer Ret
    ? (...args: R) => Ret
    : F

// Map over all client methods
type PiidInjectedClient<T> = {
    [K in keyof T]: DropFirstArg<T[K]>
}

export const client: PiidInjectedClient<typeof baseClient.api> = new Proxy(baseClient.api, {
    get(target, prop, receiver) {
        const orig = Reflect.get(target, prop, receiver)

        if (typeof orig !== 'function') {
            return orig
        }

        return (...args: any[]) => {
            const piid = useHista.getState().selectedPiid
            return orig.call(target, piid, ...args)
        }
    },
}) as any


export const login = async (userName: string, password: string): Promise<boolean | APIError> => {
    const loginParams: authentication.LoginParams = { userName: userName, password: password }
    const params: RequestInit = {
        body: JSON.stringify(loginParams),
        method: 'POST',
        credentials: 'include',
    }
    const resp = await fetch(baseUrl + '/login', params)
    if (resp.ok) {
        return true
    } else {
        const json = await resp.json()
        return new APIError(json.status, json)
    }
}
