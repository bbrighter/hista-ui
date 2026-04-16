import { StateCreator } from "zustand"

import { NonFunctionProperties, StoreType, SymptomStore } from "../store.type"
import { Symptom, SymptomCategories, SymptomCategory } from "../types"

type State = NonFunctionProperties<SymptomStore>

const initialState: State = {
  symptoms: [],
  symptomsAreLoaded: false,
}

export const createSymptomSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  SymptomStore> = (set) => ({
  ...initialState,

  resetSymptoms: () => set(initialState),

  setSymptoms: (cs: SymptomCategories) => set(state => {
    state.symptoms = cs
  }),
  setSymptomsAreLoaded: (loaded: boolean) => set(state => {state.symptomsAreLoaded = loaded}),

  addCategory: (c: SymptomCategory) => set(state => {
    state.symptoms.push(c)
  }),

  removeCategory: (id: number) => set(state => {
    state.symptoms = state.symptoms.filter(s => s.categoryId !== id)
  }),

  updateCategory: (id: number, part: Partial<SymptomCategory>) => set(state => {
    const idx = state.symptoms.findIndex(s => s.categoryId === id)
    if (idx === -1) return
    Object.assign(state.symptoms[idx], part)
  }),

  updateSymptom: (id: number, part: Partial<Symptom>) => set(state => {
    const catIdx = state.symptoms.findIndex(c => c.symptoms.some(s => s.id === id))
    if (catIdx === -1) return
    const symptomIdx = state.symptoms[catIdx].symptoms.findIndex(s => s.id === id)
    if (symptomIdx === -1) return

    Object.assign(state.symptoms[catIdx].symptoms[symptomIdx], part)
  }),
  //   setSymptoms: (s: SymptomCategories | entity.SymptomCategoriesResponse) => {
  //     let symptoms: SymptomCategories = []
  //     if (Array.isArray(s)) {
  //       symptoms = s
  //     }
  //     else {
  //       symptoms = respToSymptoms(s)
  //     }
  //     set(state => {
  //       state.symptoms = symptoms
  //     })
  //   },

  //   addSymptomCategory: (cId: number, name: string) => {
  //     set(state => {
  //       state.symptoms.unshift({ categoryId: cId, categoryName: name, symptoms: [] })
  //     })
  //   },

  //   getSymptoms: async () => {
  //     if (!get().symptomsAreLoaded || get().symptoms.length == 0) {
  //       const resp = await client.ListSymptoms()
  //       get().setSymptoms(resp)
  //       set(state => {
  //         state.symptomsAreLoaded = true
  //       })
  //     }
  //   },

  //   deleteCategory: async (cId: number) => {
  //     await client.DeleteSymptomCategory(cId)
  //     set(state => {
  //       state.symptoms = state.symptoms.filter(c => c.categoryId !== cId)
  //     })
  //   },
  //   changeSymptomCategory: async (symptomId: number, fromCategoryId: number, toCategoryId: number) => {
  //     await client.PatchSymptomCategory(symptomId, { toCategoryId: toCategoryId })
  //     set(state => {
  //       const fromCategoryIndex = state.symptoms.findIndex(c => c.categoryId == fromCategoryId)
  //       const toCategory = state.symptoms.find(c => c.categoryId == toCategoryId)
  //       if (fromCategoryIndex < 0 || !toCategory) {
  //         return
  //       }
  //       toCategory.symptoms.push(state.symptoms[fromCategoryIndex].symptoms.find(s => s.id == symptomId))
  //       state.symptoms[fromCategoryIndex].symptoms = state.symptoms[fromCategoryIndex].symptoms.filter(s => s.id != symptomId)
  //       const symptom = toCategory.symptoms.find(s => s.id == symptomId)
  //       symptom.categoryId = toCategoryId
  //     })
  //   },
  //   changeSymptomName: async (symptomId: number, newName: string) => {
  //     const trimmedName = newName.trim()
  //     await client.PatchSymptomName(symptomId, { name: trimmedName })
  //     set(state => {
  //       for (const category of state.symptoms) {
  //         const symptom = category.symptoms.find(s => s.id == symptomId)
  //         if (symptom) {
  //           symptom.name = trimmedName
  //           return
  //         }
  //       }
  //     })
  //   },

  //   changeSymptomCategoryName: async (categoryId: number, newName: string) => {
  //     const trimmedName = newName.trim()
  //     await client.PatchCategoryName(categoryId, { name: trimmedName })
  //     set(state => {
  //       const categoryIndex = state.symptoms.findIndex(c => c.categoryId == categoryId)
  //       if (categoryIndex < 0) {
  //         return
  //       }
  //       state.symptoms[categoryIndex].categoryName = trimmedName
  //     })
  //   },

  //   isCategoryNameAvailable: (categoryName: string) => {
  //     return get().symptoms.find(c => c.categoryName == categoryName.trim()) == undefined && categoryName.trim() !== ""
  //   },

  //   isSymptomNameAvailable: (symptomName: string, categoryId: number) => {
  //     const category = get().symptoms.find(c => c.categoryId == categoryId)
  //     if (!category) {
  //       return false
  //     }
  //     return category.symptoms.find(s => s.name == symptomName.trim()) == undefined && symptomName.trim() !== ""
  //   },

})
