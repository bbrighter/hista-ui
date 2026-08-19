import { delay, HttpResponse, http } from "msw";
import type { hista } from "@/api/generatedApi";
import { createTemplates } from "../fixtures/templates";

export const getTemplateListHandler = (
	resp: hista.TemplateListResponse | hista.TemplateResponse,
	ms?: number,
) =>
	http.get("/piid/:piid/templates", async () => {
		if (ms) await delay(ms);
		return HttpResponse.json(
			"templates" in resp ? resp : { templates: [resp] },
		);
	});
const postTemplateHandler = (id: number) =>
	http.post("/piid/:piid/templates", () => HttpResponse.json({ id }));
const deleteTemplateHandler = () =>
	http.delete("/piid/:piid/templates/:id", () => HttpResponse.json({}));
const putTemplateHandler = () =>
	http.put("/piid/:piid/templates/:id", () => HttpResponse.json({}));

export const templateHandlers = [
	getTemplateListHandler(createTemplates([])),
	postTemplateHandler(2),
	deleteTemplateHandler(),
	putTemplateHandler(),
];
