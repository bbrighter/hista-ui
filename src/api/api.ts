import Client, { AuthDataGenerator, ClientOptions, Environment, Local, isAPIError } from "./generatedApi";

const baseUrl = import.meta.env.PROD ? Environment("staging") : Local

const authGenerator: AuthDataGenerator = () => (window.localStorage.getItem("token") || "")
const options: ClientOptions = { auth: authGenerator }


export const client = new Client(baseUrl, options)

export const is401Response = (error: unknown): boolean => {
    return isAPIError(error) && error.status == 401
}