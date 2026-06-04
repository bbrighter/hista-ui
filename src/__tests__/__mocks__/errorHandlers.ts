import { HttpResponse, http } from "msw";

export const errorHandler = (baseUrl: string) =>
	http.post(`${baseUrl}/error`, () => HttpResponse.json({}));
