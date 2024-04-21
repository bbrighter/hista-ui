import { client } from "../api/api"
import { internalAuth } from "../api/generatedApi"

export const login = async (pw: string, userName: string) => {
    const params: internalAuth.AuthParams = { Password: pw, UserId: userName }

    const token = await client.api.Login(params)
    if (token.Bearer != "" && token.UserId != "") {
        window.sessionStorage.token = token.Bearer
        window.sessionStorage.user = token.UserId
        window.sessionStorage.authorized = true
    }
}

