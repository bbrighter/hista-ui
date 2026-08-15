import { HttpResponse, http } from "msw";

import { createTemplates } from "./fixtures/templates";

export const templateHandlers = (baseUrl: string) => [
	http.get(`${baseUrl}/templates`, () => HttpResponse.json(createTemplates())),
	http.post(`${baseUrl}/templates`, () => HttpResponse.json({ id: 2 })),
	http.delete(`${baseUrl}/templates/:id`, () => HttpResponse.json({})),
	http.put(`${baseUrl}/templates/:id`, () => HttpResponse.json({})),
];
