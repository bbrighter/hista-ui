import { StateCreator } from "zustand"

import { NonFunctionProperties, StoreType, TemplateStore } from "../store.type"
import { Template, Templates } from "../types"

type State = NonFunctionProperties<TemplateStore>

const initialState = (): State => ({
  templates: {},
})

export const createTemplateSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  TemplateStore
> = (set) => ({
  ...initialState(),

  resetTemplates: () => set(initialState()),

  setTemplates: (templates: Templates) => set(state => {
    state.templates = templates
  }),

  addTemplate: (id: number, template: Template) => set(state => {
    state.templates[id] = template
  }),

  changeTemplate: (id: number, template: Partial<Template>) => set(state => {
    const existing = state.templates[id]
    if (!existing) return 

    Object.assign(existing, template)
  }),

  removeTemplate: (id: number) => set(state => {
    state.templates = Object.fromEntries(
      Object.entries(state.templates).filter(([i]) => Number(i) != id),
    )
  }),
})