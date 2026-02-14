import { client } from '../../api/api'
import useHista from '../store'
import { respToRawDiary, respToSymptomStatistics } from '../types'

export const statisticsService = {
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
}
