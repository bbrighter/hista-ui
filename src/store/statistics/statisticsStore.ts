import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { hista } from '../../api/generatedApi'
import { IngredientStore } from '../meal/ingredientStore'
import { MealStore } from '../meal/mealStore'
import { ConditionStore } from '../symptom/conditionStore'
import { SymptomStore } from '../symptom/symptomStore'
import { SymptomStatistics } from '../types'
import { RawDiary, respToRawDiary } from './diary'

interface State {
    diaryEntries: Array<RawDiary>
    symptomStatistics: SymptomStatistics
    mealCount: number
}

interface Actions {
    getDiaryEntries: () => Promise<void>
    setMealCount: (count: number) => void
    setSymptomStatistics: (stats: SymptomStatistics) => void
    resetStatistics: () => void
}

export interface StatisticsStore extends State, Actions { }

const initialState: State = {
    diaryEntries: [],
    mealCount: 0,
    symptomStatistics: [],

}

export const createStatisticsSlice: StateCreator<
    MealStore & ConditionStore & StatisticsStore & IngredientStore & SymptomStore,
    [],
    [],
    StatisticsStore
> = (set, get) => ({
    ...initialState,

    getDiaryEntries: async (): Promise<void> => {
        const resp = await client.GetDiary()
        set(produce((draft: State) => {
            draft.diaryEntries = respToRawDiary(resp)
        }))
    },
    setMealCount: (count: number) => {
        set(produce((draft: State) => {
            draft.mealCount = count
        }))
    },
    setSymptomStatistics: (stats: SymptomStatistics) => {
        set((produce((draft: State) => {
            draft.symptomStatistics = stats
        })))
    },
    resetStatistics: () => {
        set(initialState)
    },
})
