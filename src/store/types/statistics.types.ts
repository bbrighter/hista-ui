import { hista } from "../../api/generatedApi"
import { Nutrition } from "./ingredients.types"

export type SymptomStatistics = Array<
  {
    symptomId: number
    severity: number
    within1hour: number
    within24hours: number
    within72hours: number
  }>

export const respToSymptomStatistics = (
  resp: hista.SymptomStatisticsResponse,
): SymptomStatistics => (
  resp.statistics.map(r => (
    {
      severity: r.severity,
      symptomId: r.symptomId,
      within1hour: r.hours1,
      within24hours: r.hours24,
      within72hours: r.hours72,
    })).sort(
    (a, b) => (b.within72hours - a.within72hours),
  )
)

export type NutritionStatistics = {
  interval: string
  statistics: Array<NutritionStatistic>
}

type NutritionStatistic = {
  date: Date
  nutrition: Nutrition
}

export const respToNutritionStatistics = (resp: hista.NutritionStatisticsResponse): Array<NutritionStatistic> => {
  return resp.statistics.map(s => ({
    date: new Date(s.time),
    nutrition: {
      carbohydrate: s?.nutrition?.carbohydrate ?? 0,
      fat: s?.nutrition?.fat ?? 0,
      fiber: s?.nutrition?.fiber ?? 0,
      protein: s?.nutrition?.protein ?? 0,
    } }))
}