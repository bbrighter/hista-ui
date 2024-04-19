import Client, { AuthDataGenerator, ClientOptions, Environment, Local } from "./generatedApi";

const baseUrl = import.meta.env.PROD ? Environment("staging") : Local

const authGenerator: AuthDataGenerator = () => (window.sessionStorage.getItem("token") || "")
const options: ClientOptions = { auth: authGenerator }


export const client = new Client(baseUrl, options)
