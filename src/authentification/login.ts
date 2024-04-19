import { client } from "../api/api"
import { api1 } from "../api/generatedApi"

export const login = async (pw: string, userName: string) => {
    const params: api1.AuthParams = { Password: pw, User: userName }

    const token = await client.api1.Auth(params)
    if (token.Bearer != "" && token.User != "") {
        window.sessionStorage.token = token.Bearer
        window.sessionStorage.user = token.User
        window.sessionStorage.authorized = true
    }
}

