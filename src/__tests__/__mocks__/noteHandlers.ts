import { HttpResponse, http } from "msw";

import type { hista } from "../../api/generatedApi";

const noteHandlers = (baseUrl: string) => [
	http.get(`${baseUrl}/notes`, () =>
		HttpResponse.json({
			notes: [{ id: 1, date: "2024-01-31T12:00:00Z", text: "text" }],
		} satisfies hista.NoteListResponse),
	),
	http.post(`${baseUrl}/notes`, () =>
		HttpResponse.json({
			id: 2,
			date: "2025-01-31T12:00:00Z",
			text: "text new",
		} satisfies hista.NoteResponse),
	),
	http.patch(`${baseUrl}/notes/:id`, () => HttpResponse.json({})),
	http.delete(`${baseUrl}/notes/:id`, () => HttpResponse.json({})),
];

export { noteHandlers };
