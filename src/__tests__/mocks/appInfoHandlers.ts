import { HttpResponse, http } from "msw";
import type { hista } from "@/api/generatedApi";

export const getAppInfoHandler = (resp: hista.MetaResponse) =>
	http.get("/piid/:piid/meta", () => HttpResponse.json(resp));
