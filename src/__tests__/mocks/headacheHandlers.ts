import { delay, HttpResponse, http } from "msw";

import type { hista } from "../../api/generatedApi";
import { createHeadache, createHeadacheList } from "../fixtures/headache";

export const getHeadacheListHandler = (
	override: Array<hista.HeadacheResponse> | hista.HeadacheResponse,
	ms?: number,
) =>
	http.get("/piid/:piid/headaches", async () => {
		if (ms) await delay(ms);
		return HttpResponse.json(createHeadacheList(override));
	});
export const getHeadacheHandler = (
	override: Partial<hista.HeadacheResponse> = {},
	ms?: number,
) =>
	http.get("/piid/:piid/headaches/:id", async () => {
		if (ms) await delay(ms);
		return HttpResponse.json(createHeadache(override));
	});
export const postHeadacheHandler = (id: number) =>
	http.post("/piid/:piid/headaches", () => HttpResponse.json({ id }));
const deleteHeadacheHandler = () =>
	http.delete("/piid/:piid/headaches/:id", () => HttpResponse.json({}));
const patchHeadacheHandler = () =>
	http.patch("/piid/:piid/headaches/:id", () => HttpResponse.json({}));

export const headacheHandlers = [
	getHeadacheListHandler([]),
	getHeadacheHandler(),
	postHeadacheHandler(2),
	deleteHeadacheHandler(),
	patchHeadacheHandler(),
];
