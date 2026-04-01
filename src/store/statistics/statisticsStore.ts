import { StateCreator } from "zustand"

import { NutritionStatistics, RawDiary, SymptomStatistics } from "../types"

interface State {
  diaryEntries: Array<RawDiary>
  statistics: SymptomStatistics
  mealCount: number
  nutrutionStatistics: NutritionStatistics
}

interface Actions {
  setDiaryEntries: (diaries: Array<RawDiary>) => void
  setMealCount: (count: number) => void
  setSymptomStatistics: (stats: SymptomStatistics) => void
  resetStatistics: () => void
  setNutritionStatistics: (stats: NutritionStatistics) => void
}

export interface StatisticsStore extends State, Actions { }

const initialState: State = {
  diaryEntries: [],
  mealCount: 0,
  statistics: [],
  nutrutionStatistics: { statistics: [], interval: "" },
}

export const createStatisticsSlice: StateCreator<
  StatisticsStore,
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
      state.nutrutionStatistics = stats
    })
  },
  resetStatistics: () => {
    set(initialState)
  },
})
