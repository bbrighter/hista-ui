import { StateCreator } from 'zustand'
import { client } from '../../api/api'
import { produce } from 'immer'
import { SymptomCategories, respToSymptoms } from './symptom'
import { AuthStore } from '../auth/authStore'
import { ErrorStore } from '../error/errorStore'
import { entity } from '../../api/generatedApi'

interface State {
    symptoms: SymptomCategories
    symptomsAreLoaded: boolean
}

interface Actions {
    setSymptoms: (s: SymptomCategories | entity.SymptomCategoriesResponse) => void
    addSymptomCategory: (cId: number, name: string) => void,
    getSymptoms: () => Promise<void>,

}

export interface SymptomStore extends State, Actions { }

const initialState: State = {
    symptoms: [],
    symptomsAreLoaded: false,
}

export const createSymptomSlice: StateCreator<
    AuthStore & ErrorStore & SymptomStore,
    [],
    [],
    SymptomStore> = ((set, get) => ({
        ...initialState,

        setSymptoms: (s: SymptomCategories | entity.SymptomCategoriesResponse) => {
            let symptoms: SymptomCategories = []
            if (Array.isArray(s)) {
                symptoms = s
            } else {
                symptoms = respToSymptoms(s)
            }
            set(produce((draft: State) => {
                draft.symptoms = symptoms
            }))
        },

        addSymptomCategory: (cId: number, name: string) => {
            set(produce((draft: State) => {
                draft.symptoms.unshift({ categoryId: cId, categoryName: name, symptoms: [] })
            }))
        },


        getSymptoms: async () => {
            if (!get().symptomsAreLoaded || get().symptoms.length == 0) {
                try {
                    const resp = await client.api.GetSymptoms()
                    get().setSymptoms(resp)
                    set(produce((draft: State) => {
                        draft.symptomsAreLoaded = true
                    }))
                } catch (error) {
                    get().setError(error)
                }
            }
        },

    }))

