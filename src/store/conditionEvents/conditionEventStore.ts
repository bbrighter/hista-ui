import { StateCreator } from "zustand"

import { Condition, ConditionEvent } from "../types"

interface State {
  conditionEvent: ConditionEvent
}

interface Actions {
  resetConditionEvent: () => void

  setConditionEvent: (event: ConditionEvent) => void
  updateConditionEvent: (id: number, part: Partial<ConditionEvent>) => void

  removeCondition: (id: number) => void
  addCondition: (cond: Condition) => void
  updateCondition: (id: number, part: Partial<Condition>) => void

  //   getConditionEvents: () => Promise<void>
  //   postConditionEvent: () => Promise<number>
  //   getConditionEvent: (eventId: number) => Promise<void>
  //   deleteConditionEvent: (id: number) => Promise<void>
  //   setConditionEventDate: (date: Date | dayjs.Dayjs) => Promise<void>

//   postCondition: (symptomCategoryId: number, symptomId?: number, symptomName?: string) => Promise<void>
//   postSymptomCategory: (name: string) => Promise<number>
//   patchCondition: (conditionId: number, severity: number) => Promise<void>
//   deleteCondition: (conditionId: number) => Promise<void>
}

export interface ConditionStore extends State, Actions { }

const initialState: State = {
  conditionEvent: { 
    id: 0, 
    date: new Date(), 
    conditions: [],
  },
}

export const createConditionSlice: StateCreator<
  ConditionStore,
  [["zustand/immer", never]],
  [],
  ConditionStore> = (set) => ({
  ...initialState,

  resetConditionEvent: () => set(initialState),


  setConditionEvent: (event: ConditionEvent) => set(state => {
    state.conditionEvent = event
  }),

  updateConditionEvent: (id: number, part: Partial<ConditionEvent>) => set(state => {
    if (state.conditionEvent.id === id) {
      Object.assign(state.conditionEvent, part)
    }
  }),

  removeCondition: (conditionId: number) => set(state => {
    state.conditionEvent.conditions = state.conditionEvent.conditions.filter(c => c.id !== conditionId)
  }),

  addCondition: (cond: Condition) => set(state => {
    state.conditionEvent.conditions.push(cond)
  }),

  updateCondition: (conditionId: number, part: Partial<Condition>) => set(state => {
    const idx = state.conditionEvent.conditions.findIndex(c => c.id === conditionId)
    if (idx === -1) return

    Object.assign(state.conditionEvent.conditions[idx], part)
  }),

  //   getConditionEvents: async () => {
  //     if (!get().conditionEventsAreLoaded || get().conditionEvents.length == 0) {
  //       const resp = await client.ListConditionEvents()
  //       const states = respToConditionEvents(resp)
  //       set(state => {
  //         state.conditionEvents = states
  //         state.conditionEventsAreLoaded = true
  //       })
  //     }
  //   },

  //   postConditionEvent: async () => {
  //     const resp = await client.CreateConditionEvent()
  //     const event: ConditionEvent = respToConditionEvent(resp)

  //     set(state => {
  //       const index = state.conditionEvents.findIndex(e => new Date(event.date) > new Date(e.date))
  //       if (index === -1) {
  //         state.conditionEvents.push(event)
  //       } else {
  //         state.conditionEvents.splice(index, 0, event)
  //       }
  //     })

  //     return resp.id
  //   },

  //   getConditionEvent: async (eventId: number) => {
  //     const resp = await client.GetConditionEvent(eventId)
  //     const event = respToConditionEvent(resp)
  //     set(state => {
  //       state.conditionEvent = event
  //     })
  //   },

  //   deleteConditionEvent: async (eventId: number) => {
  //     const resp = await client.DeleteConditionEvent(eventId)
  //     set(state => {
  //       state.conditionEvents = removeItemById(eventId, get().conditionEvents)
  //     })
  //     get().setSymptoms(resp)
  //   },

  //   setConditionEventDate: async (date: Date | dayjs.Dayjs) => {
  //     const params: hista.ConditionEventRequestParams = { date: date.toISOString() }
  //     await client.PatchDate(get().conditionEvent.id, params)
  //     const index = get().conditionEvents.findIndex(v => v.id == get().conditionEvent.id)
  //     if (index === -1) return
  //     const dateDate = date instanceof Date ? date : date.toDate()
  //     set(state => {
  //       state.conditionEvent.date = dateDate
  //       state.conditionEvents[index].date = dateDate
  //     })
  //   },

  //   postCondition: async (symptomCategoryId: number, symptomId?: number, symptomName?: string) => {
  //     const params: hista.ConditionRequestParams = {
  //       categoryId: symptomCategoryId,
  //       symptomId: symptomId,
  //       symptomName: symptomName,
  //     }
  //     const resp = await client.PostCondition(get().conditionEvent.id, params)
  //     const condition = respToCondition(resp.condition)
  //     get().setSymptoms(resp.symptoms)
  //     set(state => {
  //       state.conditionEvent.conditions.unshift(condition)
  //     })
  //   },

  //   postSymptomCategory: async (name: string): Promise<number> => {
  //     const params: hista.PostSymptomCategoryRequest = { name: name }
  //     const resp = await client.PostSymptomCategory(params)
  //     get().addSymptomCategory(resp.id, name)
  //     return resp.id
  //   },

  //   patchCondition: async (conditionId: number, severity: number): Promise<void> => {
  //     const params: hista.PatchSeverityRequestParams = {
  //       severity: severity,
  //     }
  //     await client.PatchCondition(conditionId, params)
  //     set(state => {
  //       const conditionIndex = state.conditionEvent.conditions.findIndex(c => c.id == conditionId)
  //       if (conditionIndex >= 0) {
  //         state.conditionEvent.conditions[conditionIndex].severity = severity
  //       }
  //     })
  //   },

//   deleteCondition: async (conditionId: number): Promise<void> => {
//     const resp = await client.DeleteCondition(conditionId)
//     get().setSymptoms(resp)
//     set(state => {
//       state.conditionEvent.conditions = removeItemById(conditionId, get().conditionEvent.conditions)
//     })
//   },
})
