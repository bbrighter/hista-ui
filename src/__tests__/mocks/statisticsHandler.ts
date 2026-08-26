import { HttpResponse, http } from "msw";

import type { hista } from "../../api/generatedApi";
import { createDiaries } from "../fixtures/statistics";

const getStatisticsHandler = (baseUrl: string) =>
	http.get(`${baseUrl}/statistics/ingredients`, () =>
		HttpResponse.json({
			count: 5,
			statistics: [
				{ symptomId: 1, hours1: 1, hours24: 1, hours72: 0, severity: 1 },
				{ symptomId: 1, hours1: 0, hours24: 1, hours72: 0, severity: 2 },
				{ symptomId: 2, hours1: 0, hours24: 1, hours72: 4, severity: 1 },
			],
		} satisfies hista.SymptomStatisticsResponse),
	);

// const getDiariesHandler = (baseUrl: string) =>
// 	http.get(`${baseUrl}/diary`, () =>
// 		HttpResponse.json({
// 			diaries: [
// 				{
// 					date: "2026-02-14T16:52:46.908836+01:00",
// 					type: "Pollen",
// 					content: "",
// 					severity: "Geringe",
// 					category: "Hasel",
// 				},
// 				{
// 					date: "2026-02-14T09:55:12.830294+01:00",
// 					type: "Symptom",
// 					content: "Kopfweh",
// 					severity: "0",
// 					category: "Kopf",
// 				},
// 				{
// 					date: "2026-02-14T09:54:55.232+01:00",
// 					type: "Food",
// 					content: "Zucchini",
// 					severity: "cooked",
// 					category: "",
// 				},
// 				{
// 					date: "2025-12-20T09:36:03.139833+01:00",
// 					type: "Note",
// 					content: "Notizi",
// 					severity: "",
// 					category: "",
// 				},
// 			],
// 		} satisfies hista.DiaryRespList),
// 	);

const getNutritionStatisticsHandler = (baseUrl: string) =>
	http.get(`${baseUrl}/statistics/nutrition`, ({ request }) => {
		const url = new URL(request.url);
		const interval = url.searchParams.get("interval");
		const statistics =
			interval === "day"
				? [
						{
							time: "2026-02-14T12:00:00.000+01:00",
							nutrition: { carbohydrate: 10, fat: 25, fiber: 5.2, protein: 0 },
						},
						{
							time: "2026-02-15T12:00:00.000+01:00",
							nutrition: { carbohydrate: 8, fat: 2, fiber: 1.2, protein: 20 },
						},
					]
				: [
						{
							time: "2026-02-01T12:00:00.000+01:00",
							nutrition: { carbohydrate: 18, fat: 30, fiber: 6.4, protein: 20 },
						},
					];

		return HttpResponse.json({
			statistics: statistics,
		} satisfies hista.NutritionStatisticsResponse);
	});

export { getNutritionStatisticsHandler, getStatisticsHandler };

export const getDiariesHandler = (
	resp: Array<hista.DiaryResp> | Partial<hista.DiaryResp>,
) => http.get("piid/:piid/diary", () => HttpResponse.json(createDiaries(resp)));
