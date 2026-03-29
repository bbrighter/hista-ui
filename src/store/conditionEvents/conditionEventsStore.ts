import { StateCreator } from "zustand"

import { ConditionEvent } from "../types/conditionEvent"
import { ConditionEvents, MetaConditionEvent } from "../types/conditionEvents"

interface State {
  conditionEvents: ConditionEvents
  isConditionEventsLoaded: boolean
}

interface Actions {
  resetConditionEvents: () => void

  setConditionEvents: (events: ConditionEvents) => void
  removeConditionEvent: (id: number) => void
  addConditionEvent: (event: MetaConditionEvent) => void
  updateConditionEvents: (id: number, part: Partial<ConditionEvent>) => void
  
  setIsConditionEventsLoaded: (loaded: boolean) => void
}

export interface ConditionsStore extends State, Actions { }

const initialState: State = {
  conditionEvents: [],
  isConditionEventsLoaded: false,
}

export const createConditionsSlice: StateCreator<
  ConditionsStore,
  [["zustand/immer", never]],
  [],
  ConditionsStore> = (set) => ({
  ...initialState,

  resetConditionEvents: () => set(initialState),

  setConditionEvents: (events: ConditionEvents) => set(state => {
    state.conditionEvents = events
  }),

  addConditionEvent: (event: MetaConditionEvent) => set(state => {
    state.conditionEvents.push(event)
  }),


  updateConditionEvents: (id: number, part: Partial<ConditionEvent>) => set(state => {
    const idx = state.conditionEvents.findIndex(c => c.id == id)
    if (idx > -1) {
      Object.assign(state.conditionEvents[idx], part)
    }
  }),

  removeConditionEvent: (id: number) => set(state => {
    state.conditionEvents = state.conditionEvents.filter(c => c.id !== id)
  }),

  setIsConditionEventsLoaded: (loaded: boolean) => set(state => {
    state.isConditionEventsLoaded = loaded
  }),
})
