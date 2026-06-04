import { HttpResponse, http } from "msw";

import type { hista } from "../../api/generatedApi";

const headache = {
	id: 1,
	date: "2022-01-01T00:00:00Z",
	severity: 3,
	types: ["stabbing"],
	positions: ["left", "right"],
	symptoms: ["tired", "nausea"],
	description: "description",
} satisfies hista.HeadacheResponse;

const headacheHandlers = (baseUrl: string) => [
	http.get(`${baseUrl}/headaches`, () =>
		HttpResponse.json({ headaches: [headache] }),
	),
	http.post(`${baseUrl}/headaches`, () => HttpResponse.json({ id: 2 })),
	http.get(`${baseUrl}/headaches/:id`, () => HttpResponse.json(headache)),
	http.delete(`${baseUrl}/headaches/:id`, () => HttpResponse.json({})),
	http.patch(`${baseUrl}/headaches/:id`, () => HttpResponse.json({})),
];

export { headacheHandlers };
