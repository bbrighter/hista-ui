import { client } from "../api/api"
import { internalAuth } from "../api/generatedApi"

export const login = async (pw: string, userName: string) => {
    const params: internalAuth.AuthParams = { Password: pw, UserId: userName }

    const token = await client.api.Login(params)
    if (token.Bearer != "" && token.UserId != "") {
        window.localStorage.token = token.Bearer
        window.localStorage.user = token.UserId
        window.localStorage.authorized = true
    }
}

