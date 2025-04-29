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
    deleteCategory: (cId: number) => Promise<void>,
    changeSymptomCategory: (symptomId: number, fromCategoryId: number, toCategoryId: number) => Promise<void>,
    changeSymptomName: (symptomId: number, newName: string) => Promise<void>,
    changeSymptomCategoryName: (categoryId: number, newName: string) => Promise<void>,
    isCategoryNameAvailable: (categoryName: string) => boolean,
    isSymptomNameAvailable: (symptomName: string, categoryId: number) => boolean,
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

        deleteCategory: async (cId: number) => {
            try {
                await client.api.DeleteSymptomCategory(cId)
                set(produce((draft: State) => {
                    draft.symptoms = draft.symptoms.filter(c => c.categoryId !== cId)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        changeSymptomCategory: async (symptomId: number, fromCategoryId: number, toCategoryId: number) => {
            try {
                await client.api.PatchSymptomCategory(symptomId, { toCategoryId: toCategoryId })
                set(produce((draft: State) => {
                    const fromCategoryIndex = draft.symptoms.findIndex(c => c.categoryId == fromCategoryId)
                    const toCategory = draft.symptoms.find(c => c.categoryId == toCategoryId)
                    if (fromCategoryIndex < 0 || !toCategory) {
                        return
                    }
                    toCategory.symptoms.push(draft.symptoms[fromCategoryIndex].symptoms.find(s => s.id == symptomId))
                    draft.symptoms[fromCategoryIndex].symptoms = draft.symptoms[fromCategoryIndex].symptoms.filter(s => s.id != symptomId)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        changeSymptomName: async (symptomId: number, newName: string) => {
            const trimmedName = newName.trim()
            try {
                await client.api.PatchSymptomName(symptomId, { name: trimmedName })
                set(produce((draft: State) => {
                    draft.symptoms = draft.symptoms.map(c => {
                        return {
                            ...c,
                            symptoms: c.symptoms.map(s => {
                                if (s.id === symptomId) {
                                    return { ...s, name: trimmedName }
                                }
                                return s
                            }),
                        }
                    })
                }))
            }
            catch (error) {
                get().setError(error)
            }
        },

        changeSymptomCategoryName: async (categoryId, newName) => {
            const trimmedName = newName.trim()
            try {
                await client.api.PatchCategoryName(categoryId, { name: trimmedName })
                set(produce((draft: State) => {
                    const categoryIndex = draft.symptoms.findIndex(c => c.categoryId == categoryId)
                    if (categoryIndex < 0) {
                        return
                    }
                    draft.symptoms[categoryIndex].categoryName = trimmedName
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        isCategoryNameAvailable: (categoryName: string) => {
            return get().symptoms.find(c => c.categoryName == categoryName.trim()) == undefined && categoryName.trim() !== ''
        },

        isSymptomNameAvailable: (symptomName: string, categoryId: number) => {
            const category = get().symptoms.find(c => c.categoryId == categoryId)
            if (!category) {
                return false
            }
            return category.symptoms.find(s => s.name == symptomName.trim()) == undefined && symptomName.trim() !== ''
        },

    }))

