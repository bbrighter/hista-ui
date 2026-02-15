import { http, HttpResponse } from "msw"

import { authentication } from "../../api/generatedApi"

const authHandlers = (baseUrl: string) => ([
  http.post(baseUrl + "/login", () => (HttpResponse.json({ token: "new token" } as authentication.LoginResponse))),
])

export { authHandlers }
