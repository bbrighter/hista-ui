import { StateCreator } from "zustand"

import { NonFunctionProperties, StoreType, SymptomStore } from "../store.type"
import { Symptom, SymptomCategories, SymptomCategory } from "../types"

type State = NonFunctionProperties<SymptomStore>

const initialState: State = {
  symptoms: [],
}

export const createSymptomSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  SymptomStore> = (set) => ({
  ...initialState,

  resetSymptoms: () => set(initialState),

  setSymptoms: (cs: SymptomCategories) => {set(state => {
    state.symptoms = cs
  })},

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
})
