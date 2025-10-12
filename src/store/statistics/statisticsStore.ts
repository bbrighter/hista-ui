import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { client } from '../../api/api';
import { hista } from '../../api/generatedApi';
import { IngredientStore } from '../meal/ingredientStore';
import { MealStore } from '../meal/mealStore';
import { ConditionStore } from '../symptom/conditionStore';
import { SymptomStore } from '../symptom/symptomStore';
import { RawDiary, respToRawDiary } from './diary';
import { FoodStatistics, respToStatistics, respToSymptomStatistics, SymptomStatistics } from './statistics';

interface State {
    diaryEntries: Array<RawDiary>
    foodStatistics: Array<FoodStatistics>
    symptomStatistics: Array<SymptomStatistics>
}

interface Actions {
    getDiaryEntries: () => Promise<void>,
    getFoodStatistics: (fromDate: Date, toDate: Date, symptomIds: Array<number>) => Promise<void>,
    getSymptomStatistics: (fromDate: Date, toDate: Date, ingredientIds: Array<number>) => Promise<void>,
    resetStatistics: () => void,
}

export interface StatisticsStore extends State, Actions { }

const initialState: State = {
    diaryEntries: [],
    foodStatistics: [],
    symptomStatistics: [],

}

export const createStatisticsSlice: StateCreator<
    MealStore & ConditionStore & StatisticsStore & IngredientStore & SymptomStore,
    [],
    [],
    StatisticsStore
> = ((set, get) => ({
    ...initialState,

    getDiaryEntries: async (): Promise<void> => {
        const resp = await client.GetDiary()
        set(produce((draft: State) => {
            draft.diaryEntries = respToRawDiary(resp)
        }))
    },
    getFoodStatistics: async (fromDate: Date, toDate: Date, symptomIds: Array<number>): Promise<void> => {
        const params: hista.StatisticParams = {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString(),
            ids: symptomIds,
        }
        const resp = await client.GetStatisticsBySymptomIds(params)
        set(produce((draft: State) => {
            draft.foodStatistics = respToStatistics(resp, get().ingredients)
        }))
    },
    getSymptomStatistics: async (fromDate: Date, toDate: Date, ingredientIds: Array<number>): Promise<void> => {
        const params: hista.StatisticParams = {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString(),
            ids: ingredientIds,
        }
        const resp = await client.GetStatisticsByIngredientsIds(params)
        set(produce((draft: State) => {
            draft.symptomStatistics = respToSymptomStatistics(resp, get().symptoms)
        }))
    },
    resetStatistics: () => {
        set(initialState)
    },
}))