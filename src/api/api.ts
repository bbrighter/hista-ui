import Client, { AuthDataGenerator, ClientOptions, Environment, Local, api1 } from "./generatedApi";

const baseUrl = import.meta.env.PROD ? Environment("staging") : Local

const authGenerator: AuthDataGenerator = () => (window.sessionStorage.getItem("token") || "")
const options: ClientOptions = { auth: authGenerator }

export const login = async (pw: string) => {
    const params: api1.AuthParams = { Password: pw }
    const token = await client.api1.Auth(params)
    window.sessionStorage.token = token.Token
}


export const client = new Client(baseUrl, options)
