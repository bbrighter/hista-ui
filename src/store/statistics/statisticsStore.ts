import { StateCreator } from 'zustand';
import { RawDiary, respToRawDiary } from './diary';
import { AuthStore } from '../auth/authStore';
import { ErrorStore } from '../error/errorStore';
import { MealStore } from '../meal/mealStore';
import { SymptomStore } from '../symptom/symptomStore';
import { client } from '../../api/api';
import { produce } from 'immer';
import { api } from '../../api/generatedApi';
import { FoodStatistics, SymptomStatistics, respToStatistics, respToSymptomStatistics } from './statistics';
import { IngredientStore } from '../meal/ingredientStore';

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
    AuthStore & ErrorStore & MealStore & SymptomStore & StatisticsStore & IngredientStore,
    [],
    [],
    StatisticsStore
> = ((set, get) => ({
    ...initialState,

    getDiaryEntries: async (): Promise<void> => {
        try {
            const resp = await client.api.GetDiary()
            set(produce((draft: State) => {
                draft.diaryEntries = respToRawDiary(resp)
            }))
        } catch (error) {
            get().setError(error)
        }
    },
    getFoodStatistics: async (fromDate: Date, toDate: Date, symptomIds: Array<number>): Promise<void> => {
        const params: api.StatisticParams = {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString(),
            ids: symptomIds,
        }
        try {
            const resp = await client.api.GetStatisticsBySymptomIds(params)
            set(produce((draft: State) => {
                draft.foodStatistics = respToStatistics(resp, get().ingredients)
            }))
        } catch (error) {
            get().setError(error)
        }
    },
    getSymptomStatistics: async (fromDate: Date, toDate: Date, ingredientIds: Array<number>): Promise<void> => {
        const params: api.StatisticParams = {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString(),
            ids: ingredientIds,
        }
        try {
            const resp = await client.api.GetStatisticsByIngredientsIds(params)
            set(produce((draft: State) => {
                draft.symptomStatistics = respToSymptomStatistics(resp, get().symptoms)
            }))
        } catch (error) {
            get().setError(error)
        }
    },
    resetStatistics: () => {
        set(produce((draft: State) => {
            draft.foodStatistics = []
            draft.symptomStatistics = []
        }))
    },
}))