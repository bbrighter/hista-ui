import { StateCreator } from "zustand"

import { NonFunctionProperties, StatisticsStore, StoreType } from "../store.type"
import { NutritionStatistics, RawDiary, SymptomStatistics } from "../types"

type State = NonFunctionProperties<StatisticsStore>

const initialState: State = {
  diaryEntries: [],
  mealCount: 0,
  statistics: [],
  nutritionStatistics: { statistics: [], interval: "" },
}

export const createStatisticsSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  StatisticsStore
> = set => ({
  ...initialState,
  setDiaryEntries: (diaries: Array<RawDiary>) => {
    set(state => {
      state.diaryEntries = diaries
    })
  },
  setMealCount: (count: number) => {
    set(state => {
      state.mealCount = count
    })
  },
  setSymptomStatistics: (stats: SymptomStatistics) => {
    set(state => {
      state.statistics = stats
    })
  },
  setNutritionStatistics: (stats: NutritionStatistics) => {
    set(state => {
      state.nutritionStatistics = stats
    })
  },
  resetStatistics: () => {
    set(initialState)
  },
})
