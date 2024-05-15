import { StateCreator } from "zustand";
import { RawDiary, respToRawDiary } from "./diary";
import { AuthStore } from "../auth/authStore";
import { ErrorStore } from "../error/errorStore";
import { MealStore } from "../meal/mealStore";
import { SymptomStore } from "../symptom/symptomStore";
import { client } from "../../api/api";
import { produce } from "immer";

interface State {
    diaryEntries: Array<RawDiary>
}

interface Actions {
    getDiaryEntries: () => Promise<void>,
}

export interface StatisticsStore extends State, Actions { }

const initialState: State = {
    diaryEntries: [],
}

export const createStatisticsSlice: StateCreator<
    AuthStore & ErrorStore & MealStore & SymptomStore & StatisticsStore,
    [],
    [],
    StatisticsStore
> = ((set, get) => ({
    ...initialState,

    getDiaryEntries: async (): Promise<void> => {
        console.log('getting diary entries')
        try {
            const resp = await client.statistics.GetDiary()
            console.log('resp', resp)
            set(produce((draft: State) => {
                draft.diaryEntries = respToRawDiary(resp)
            }))
        } catch (error) {
            get().setError(error)
        }
    }
}))