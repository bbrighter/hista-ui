/* eslint-disable @typescript-eslint/no-explicit-any */
import useHista from '../store/store';
import Client, { APIError, AuthDataGenerator, authentication, ClientOptions, Environment, Local } from './generatedApi';


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

const authGenerator: AuthDataGenerator = () => {
    const auth: authentication.AuthParams = { Token: window.localStorage.getItem('token') || '' }
    return auth
}

const options: ClientOptions = { auth: authGenerator, fetcher: (...args: Parameters<typeof fetch>) => fetch(...args) }


const baseClient = new Client(baseUrl, options)

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
            const piid = useHista.getState().piid
            if (!piid) {
                throw new Error('No piid set in Zustand store')
            }

            // Prepend piid to args automatically
            return orig.call(target, piid, ...args)
        }
    },
}) as any


export const login = async (userName: string, password: string): Promise<{ token: string, status: string, details?: string } | APIError> => {
    const loginParams: authentication.LoginParams = { userName: userName, password: password }
    const params: RequestInit = {
        body: JSON.stringify(loginParams),
        method: 'POST',
    }
    const resp = await fetch(baseUrl + '/login', params)
    if (resp.ok) {
        const json = await resp.json() as authentication.LoginResponse
        return { token: json.token, status: 'ok' }
    } else {
        const json = await resp.json()
        return new APIError(json.status, json)
    }
}
