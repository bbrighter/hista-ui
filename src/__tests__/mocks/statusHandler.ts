import { delay, HttpResponse, http } from "msw";
import type { hista } from "@/api/generatedApi";

export const getStatusListHandler = (resp: hista.StatusListResponse) =>
	http.get("/piid/:piid/status", () => HttpResponse.json(resp));
export const postStatusHandler = (resp?: hista.StatusResponse) =>
	http.post("/piid/:piid/status", () => HttpResponse.json(resp));
export const deleteStatusHandler = () =>
	http.delete("/piid/:piid/status/:id", () => HttpResponse.json());
export const patchStatusHandler = () =>
	http.patch("/piid/:piid/status/:id", () => HttpResponse.json());

export const getStatusListDelayedHandler = (
	ms: number,
	resp: hista.StatusListResponse,
) =>
	http.get("/piid/:piid/status", async () => {
		await delay(ms);
		return HttpResponse.json(resp);
	});
