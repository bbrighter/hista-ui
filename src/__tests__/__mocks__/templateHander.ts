import { HttpResponse, http } from "msw";

import type { hista } from "../../api/generatedApi";

export const templateHandlers = (baseUrl: string) => [
	http.get(`${baseUrl}/templates`, () =>
		HttpResponse.json({
			templates: [
				{
					id: 1,
					name: "Template",
					items: [{ condition: "raw", ingredientId: 1 }],
				},
			],
		} as hista.TemplateListResponse),
	),

	http.post(`${baseUrl}/templates`, () => HttpResponse.json({ id: 2 })),
	http.delete(`${baseUrl}/templates/:id`, () => HttpResponse.json({})),
	http.put(`${baseUrl}/templates/:id`, () => HttpResponse.json({})),
];
