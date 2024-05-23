import { StateCreator } from "zustand";
import { RawDiary, respToRawDiary } from "./diary";
import { AuthStore } from "../auth/authStore";
import { ErrorStore } from "../error/errorStore";
import { MealStore } from "../meal/mealStore";
import { SymptomStore } from "../symptom/symptomStore";
import { client } from "../../api/api";
import { produce } from "immer";
import { statistics } from "../../api/generatedApi";
import { Statistics, respToStatistics } from "./statistics";

interface State {
    diaryEntries: Array<RawDiary>
    statistics: Array<Statistics>
}

interface Actions {
    getDiaryEntries: () => Promise<void>,
    getStatistics: (fromDate: Date, toDate: Date, symptomIds: Array<number>) => Promise<void>
}

export interface StatisticsStore extends State, Actions { }

const initialState: State = {
    diaryEntries: [],
    statistics: [],
}

export const createStatisticsSlice: StateCreator<
    AuthStore & ErrorStore & MealStore & SymptomStore & StatisticsStore,
    [],
    [],
    StatisticsStore
> = ((set, get) => ({
    ...initialState,

    getDiaryEntries: async (): Promise<void> => {
        try {
            const resp = await client.statistics.GetDiary()
            set(produce((draft: State) => {
                draft.diaryEntries = respToRawDiary(resp)
            }))
        } catch (error) {
            get().setError(error)
        }
    },
    getStatistics: async (fromDate: Date, toDate: Date, symptomIds: Array<number>): Promise<void> => {
        const params: statistics.StatisticParams = {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString(),
            symptomIds: symptomIds
        }
        try {
            const resp = await client.statistics.GetSymptomsBySymptomIDs(params)
            set(produce((draft: State) => {
                draft.statistics = respToStatistics(resp)
            }))
        } catch (error) {
            get().setError(error)
        }
    }
}))