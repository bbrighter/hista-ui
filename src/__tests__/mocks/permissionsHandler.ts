import { HttpResponse, http } from "msw";

import type { entity } from "../../api/generatedApi";
import { PIID } from "../fixtures/piid";

const permissionsHandler = (baseUrl: string) => [
	http.get(`${baseUrl}/permissions`, () =>
		HttpResponse.json({
			userId: "1234",
			userName: "user 1",
			instances: [
				{
					piid: PIID,
					product: "prod",
					appMapping: { "user-management": true },
				},
			],
		} as entity.AuthData),
	),
];

export { permissionsHandler };
