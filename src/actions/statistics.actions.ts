import { client } from "../api/api"
import { hista } from "../api/generatedApi"
import { respToNutritionStatistics, respToRawDiary, respToSymptomStatistics } from "../store"
import useHista from "../store/store"

export const statistics = {
  getMealStatistics: async (from: Date, to: Date, ingredientId: number | undefined) => {
    if (!ingredientId || ingredientId == 0) return
    const resp = await client.GetStatisticsByIngredientId({ fromDate: from.toISOString(), toDate: to.toISOString(), id: ingredientId })

    const { setMealCount, setSymptomStatistics } = useHista.getState()
    setMealCount(resp.count)
    setSymptomStatistics(respToSymptomStatistics(resp))
  },

  getDiaries: async () => {
    const resp = await client.GetDiary()

    const { setDiaryEntries } = useHista.getState()
    setDiaryEntries(respToRawDiary(resp))
  },

  getNutritionStatistics: async (interval: "day" | "week" | "month" | "quarter", from?: Date, to?: Date) => {
    const params: hista.NutritionStatisticsParams = { Interval: interval } 
    if (from) {
      params.From = from.toISOString()
    }
    if (to) {
      params.To = to.toISOString()
    }
    const resp = await client.GetNutritionByInterval(params)

    const { setNutritionStatistics } = useHista.getState()
    setNutritionStatistics({ interval: interval, statistics: respToNutritionStatistics(resp) })
  },
}
