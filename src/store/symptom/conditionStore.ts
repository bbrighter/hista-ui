import dayjs from 'dayjs'
import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { hista } from '../../api/generatedApi'
import { respToCondition } from './condition'
import { ConditionEvent, respToConditionEvent } from './conditionEvent'
import { ConditionEvents, respToConditionEvents } from './conditionEvents'
import { SymptomStore } from './symptomStore'

interface State {
    conditionEvents: ConditionEvents
    conditionEventsAreLoaded: boolean
    conditionEvent: ConditionEvent
}

interface Actions {
    resetConditionEvents: () => void
    // ConditionEvents
    getConditionEvents: () => Promise<void>
    postConditionEvent: () => Promise<number | void>

    // ConditionEvent
    getConditionEvent: (eventId: number) => Promise<void>
    deleteConditionEvent: (eventId: number) => Promise<void>
    setConditionEventDate: (date: Date | dayjs.Dayjs) => Promise<void>

    // Conditions
    postSymptomCategory: (name: string) => Promise<number>
    postCondition: (symptomCategoryId: number, symptomId: number | undefined, symptomName: string | undefined) => Promise<void>

    // Condition
    patchCondition: (conditionId: number, severity: number) => Promise<void>
    deleteCondition: (conditionId: number) => Promise<void>
}

export interface ConditionStore extends State, Actions { }

const initialState: State = {
    conditionEvents: [],
    conditionEventsAreLoaded: false,
    conditionEvent: { id: 0, date: new Date(), conditions: [] },
}

export const createConditionSlice: StateCreator<
    ConditionStore & SymptomStore,
    [],
    [],
    ConditionStore> = (set, get) => ({
        ...initialState,

        resetConditionEvents: () => set(initialState),

        // ConditionEvents
        getConditionEvents: async () => {
            if (!get().conditionEventsAreLoaded || get().conditionEvents.length == 0) {
                const resp = await client.ListConditionEvents()
                const states = respToConditionEvents(resp)
                set(produce((draft: State) => {
                    draft.conditionEvents = states
                    draft.conditionEventsAreLoaded = true
                }))
            }
        },
        postConditionEvent: async () => {
            const resp = await client.CreateConditionEvent()
            set(produce((draft: State) => {
                const event: ConditionEvent = respToConditionEvent(resp)
                const index = draft.conditionEvents.findIndex(
                    e => new Date(event.date) > new Date(e.date),
                )
                if (index === -1) {
                    draft.conditionEvents.push(event)
                }
                else {
                    draft.conditionEvents.splice(index, 0, event)
                }
            }))
            return resp.id
        },

        // ConditionEvent
        getConditionEvent: async (eventId: number) => {
            const resp = await client.GetConditionEvent(eventId)
            const event = respToConditionEvent(resp)
            set(produce((draft: State) => {
                draft.conditionEvent = event
            }))
        },
        deleteConditionEvent: async (eventId: number) => {
            const resp = await client.DeleteConditionEvent(eventId)
            set(produce((draft: State) => {
                draft.conditionEvents = removeItemById(eventId, get().conditionEvents)
            }))
            get().setSymptoms(resp)
        },
        setConditionEventDate: async (date: Date | dayjs.Dayjs) => {
            const params: hista.ConditionEventRequestParams = { date: date.toISOString() }
            await client.PatchDate(get().conditionEvent.id, params)
            const index = get().conditionEvents.findIndex(v => v.id == get().conditionEvent.id)
            if (index === -1) return
            const dateDate = date instanceof Date ? date : date.toDate()
            set(produce((draft: State) => {
                draft.conditionEvent.date = dateDate
                draft.conditionEvents[index].date = dateDate
            }))
        },

        // Conditions
        postCondition: async (symptomCategoryId: number, symptomId?: number, symptomName?: string) => {
            const params: hista.ConditionRequestParams = {
                categoryId: symptomCategoryId,
                symptomId: symptomId,
                symptomName: symptomName,
            }
            const resp = await client.PostCondition(get().conditionEvent.id, params)
            const condition = respToCondition(resp.condition)
            get().setSymptoms(resp.symptoms)
            set(produce((draft: State) => {
                draft.conditionEvent.conditions.unshift(condition)
            }))
        },
        postSymptomCategory: async (name: string): Promise<number> => {
            const params: hista.PostSymptomCategoryRequest = { name: name }
            const resp = await client.PostSymptomCategory(params)
            get().addSymptomCategory(resp.id, name)
            return resp.id
        },
        patchCondition: async (conditionId: number, severity: number): Promise<void> => {
            const params: hista.PatchSeverityRequestParams = {
                severity: severity,
            }
            await client.PatchCondition(conditionId, params)
            const conditionIndex = get().conditionEvent.conditions.findIndex(c => c.id == conditionId)
            set(produce((draft: State) => {
                draft.conditionEvent.conditions[conditionIndex].severity = severity
            }))
        },
        deleteCondition: async (conditionId: number): Promise<void> => {
            const resp = await client.DeleteCondition(conditionId)
            get().setSymptoms(resp)
            set(produce((draft: State) => {
                draft.conditionEvent.conditions = removeItemById(conditionId, get().conditionEvent.conditions)
            }))
        },

    })

interface Items {
    id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
    return items.filter(it => it.id != id)
}
