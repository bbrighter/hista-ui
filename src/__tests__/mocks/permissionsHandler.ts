import { HttpResponse, http } from "msw";

import type { entity } from "../../api/generatedApi";

const permissionsHandler = (baseUrl: string) => [
	http.get(`${baseUrl}/permissions`, () =>
		HttpResponse.json({
			userId: "1234",
			userName: "user 1",
			instances: [
				{
					piid: "7b3047c2-d56d-4942-abc4-39eb85e785f2",
					product: "prod",
					appMapping: { "user-management": true },
				},
			],
		} as entity.AuthData),
	),
];

export { permissionsHandler };
