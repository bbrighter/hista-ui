import { http, HttpResponse } from "msw"

import { entity, hista } from "../../api/generatedApi"

const getStatisticsHandler = (baseUrl: string) => (
  http.get(baseUrl + "/statistics/ingredients", () => HttpResponse.json({
    count: 5,
    statistics: [
      { symptomId: 1, hours1: 1, hours24: 1, hours72: 0, severity: 1 },
      { symptomId: 1, hours1: 0, hours24: 1, hours72: 0, severity: 2 },
      { symptomId: 2, hours1: 0, hours24: 1, hours72: 4, severity: 1 },
    ],
  } satisfies entity.SymptomStatisticsResponse))
)

const getDiariesHandler = (baseUrl: string) => (
  http.get(baseUrl + "/diary", () => HttpResponse.json({ diaries: [
    {
      date: "2026-02-14T16:52:46.908836+01:00",
      type: "Pollen",
      content: "",
      severity: "Geringe",
      category: "Hasel",
    },
    {
      date: "2026-02-14T09:55:12.830294+01:00",
      type: "Symptom",
      content: "Kopfweh",
      severity: "0",
      category: "Kopf",
    },
    {
      date: "2026-02-14T09:54:55.232+01:00",
      type: "Food",
      content: "Zucchini",
      severity: "cooked",
      category: "",
    },
    {
      date: "2025-12-20T09:36:03.139833+01:00",
      type: "Note",
      content: "Notizi",
      severity: "",
      category: "",
    },
  ] } satisfies hista.DiaryResp))
)

const getNutritionStatisticsHandler = (baseUrl: string) => (
  http.get(`${baseUrl}/statistics/nutrition`, () => HttpResponse.json({
    statistics: [
      { time: "2026-02-14T12:00:00.000+01:00", nutrition: { carbohydrate: 10, fat: 25, fiber: 5.2, protein: 0 } },
      { time: "2026-02-15T12:00:00.000+01:00", nutrition: { carbohydrate: 8, fat: 2, fiber: 1.2, protein: 20 } },
    ],
  } satisfies entity.NutritionStatisticsResponse))
)

export { getDiariesHandler, getNutritionStatisticsHandler,getStatisticsHandler }
