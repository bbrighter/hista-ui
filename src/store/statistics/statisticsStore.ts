import { StateCreator } from "zustand"

import { IngredientStore } from "../meal/ingredientStore"
import { MealStore } from "../meal/mealStore"
import { ConditionStore } from "../conditionEvents/conditionEventsStore"
import { SymptomStore } from "../symptom/symptomStore"
import { NutritionStatistics, SymptomStatistics as Statistics } from "../types"
import { RawDiary } from "../types/diary.types"

interface State {
  diaryEntries: Array<RawDiary>
  statistics: Statistics
  mealCount: number
  nutrutionStatistics: NutritionStatistics
}

interface Actions {
  setDiaryEntries: (diaries: Array<RawDiary>) => void
  setMealCount: (count: number) => void
  setSymptomStatistics: (stats: Statistics) => void
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
    MealStore & ConditionStore & StatisticsStore & IngredientStore & SymptomStore,
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
  setSymptomStatistics: (stats: Statistics) => {
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
