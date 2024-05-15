import Client, { AuthDataGenerator, ClientOptions, Environment, Local, internalAuth, isAPIError } from "./generatedApi";


const getStageURL = (): string => {
    const hostname = new URL(window.location.href).hostname
    if (hostname.includes("hista-ui-git")) {
        return Environment("staging")
    } else {
        return Environment("prod")
    }
}

const baseUrl = import.meta.env.PROD ? getStageURL() : Local

const authGenerator: AuthDataGenerator = () => {
    return (
        {
            Authorization: window.localStorage.getItem("token") || "",
            UserName: window.localStorage.getItem("user") || "",
        } as internalAuth.AuthParams)
}

const options: ClientOptions = { auth: authGenerator }


export const client = new Client(baseUrl, options)

export const is401Response = (error: unknown): boolean => {
    return isAPIError(error) && error.status == 401
}

export const login = async (userName: string, password: string): Promise<{ token: string, status: string, details?: string }> => {
    const loginParams: internalAuth.LoginParams = { userName: userName, password: password }
    const params: RequestInit = {
        body: JSON.stringify(loginParams),
        method: "POST",
    }
    const resp = await fetch(baseUrl + "/login", params)
    if (resp.ok) {
        const json = await resp.json() as internalAuth.LoginResponse
        return { token: json.token, status: "ok" }
    } else {
        const json = await resp.json()
        if (isAPIError(json)) {
            return {
                token: "", status: json.code, details: json.details
            }
        }
    }

    return { token: "", status: "not ok" }
}
