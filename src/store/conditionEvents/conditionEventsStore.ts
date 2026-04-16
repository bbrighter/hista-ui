import { StateCreator } from "zustand"

import { ConditionEventsStore, NonFunctionProperties, StoreType } from "../store.type"
import { ConditionEvent } from "../types/conditionEvent"
import { ConditionEvents, MetaConditionEvent } from "../types/conditionEvents"

type State = NonFunctionProperties<ConditionEventsStore>

const initialState: State = {
  conditionEvents: [],
  isConditionEventsLoaded: false,
}

export const createConditionsSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  ConditionEventsStore> = (set) => ({
  ...initialState,

  resetConditionEvents: () => set(initialState),

  setConditionEvents: (events: ConditionEvents) => set((state: State) => {
    state.conditionEvents = events
  }),

  addConditionEvent: (event: MetaConditionEvent) => set((state: State) => {
    state.conditionEvents.push(event)
  }),


  updateConditionEvents: (id: number, part: Partial<ConditionEvent>) => set((state: State) => {
    const idx = state.conditionEvents.findIndex(c => c.id == id)
    if (idx > -1) {
      Object.assign(state.conditionEvents[idx], part)
    }
  }),

  removeConditionEvent: (id: number) => set((state: State) => {
    state.conditionEvents = state.conditionEvents.filter(c => c.id !== id)
  }),

  setIsConditionEventsLoaded: (loaded: boolean) => set((state: State) => {
    state.isConditionEventsLoaded = loaded
  }),
})
