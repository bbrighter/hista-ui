import { StateCreator } from "zustand"
import { client } from "../../api/api"
import { produce } from "immer"
import { api } from "../../api/generatedApi"
import { ConditionEvents, respToConditionEvents } from "./conditionEvents"
import { ConditionEvent, respToConditionEvent } from "./conditionEvent"
import { SymptomCategories, respToSymptoms } from "./symptom"
import { respToCondition } from "./condition"
import { AuthStore } from "../auth/authStore"
import { MealStore } from "../meal/mealStore"
import { ErrorStore } from "../error/errorStore"

interface State {
    conditionEvents: ConditionEvents
    conditionEventsAreLoaded: boolean
    conditionEvent: ConditionEvent
    symptoms: SymptomCategories
    symptomsAreLoaded: boolean
}

interface Actions {
    // ConditionEvents
    getConditionEvents: () => Promise<void>,
    postConditionEvent: () => Promise<number | void>,

    // ConditionEvent
    getConditionEvent: (eventId: number) => Promise<void>,
    deleteConditionEvent: (eventId: number) => Promise<void>,
    setConditionEventDate: (date: Date) => Promise<void>,

    // Symptoms
    getSymptoms: () => Promise<void>,

    // Conditions
    postSymptomCategory: (name: string) => Promise<number>,
    postCondition: (symptomCategoryId: number, symptomId: number | undefined, symptomName: string | undefined) => Promise<void>,

    // Condition
    patchCondition: (conditionId: number, severity: number) => Promise<void>,
    deleteCondition: (conditionId: number) => Promise<void>,
}

export interface SymptomStore extends State, Actions { }

const initialState: State = {
    conditionEvents: [],
    conditionEventsAreLoaded: false,
    conditionEvent: { id: 0, date: new Date(), conditions: [] },
    symptoms: [],
    symptomsAreLoaded: false,
}

export const createSymptomSlice: StateCreator<
    AuthStore & ErrorStore & MealStore & SymptomStore,
    [],
    [],
    SymptomStore> = ((set, get) => ({
        ...initialState,

        // ConditionEvents
        getConditionEvents: async () => {
            if (!get().conditionEventsAreLoaded || get().conditionEvents.length == 0) {
                try {
                    const resp = await client.api.GetConditionEvents()
                    const states = respToConditionEvents(resp)
                    set(produce((draft: State) => {
                        draft.conditionEvents = states
                        draft.conditionEventsAreLoaded = true
                    }))
                } catch (error) {
                    get().setError(error)
                }
            }

        },
        postConditionEvent: async () => {
            const date = new Date()
            const params: api.ConditionEventRequestParams = { date: date.toISOString() }
            try {
                const resp = await client.api.CreateConditionEvent(params)
                set(produce((draft: State) => {
                    const event: ConditionEvent = respToConditionEvent(resp)
                    draft.conditionEvents.unshift(event)
                }))
                return resp.id
            } catch (error) {
                get().setError(error)
            }
        },

        // ConditionEvent
        getConditionEvent: async (eventId: number) => {
            try {
                const resp = await client.api.GetConditionEvent(eventId)
                const event = respToConditionEvent(resp)
                set(produce((draft: State) => {
                    draft.conditionEvent = event
                }))

            } catch (error) {
                get().setError(error)
            }
        },
        deleteConditionEvent: async (eventId: number) => {
            try {
                const resp = await client.api.DeleteConditionEvent(eventId)
                set(produce((draft: State) => {
                    draft.conditionEvents = removeItemById(eventId, get().conditionEvents)
                    draft.symptoms = respToSymptoms(resp)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        setConditionEventDate: async (date: Date) => {
            try {
                const params: api.ConditionEventRequestParams = { date: date.toISOString() }
                await client.api.PatchDate(get().conditionEvent.id, params)
                set(produce((draft: State) => {
                    draft.conditionEvent.date = date
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        // Symtpoms
        getSymptoms: async () => {
            if (!get().symptomsAreLoaded || get().symptoms.length == 0) {
                try {
                    const resp = await client.api.GetSymptoms()
                    const symtpoms = respToSymptoms(resp)
                    set(produce((draft: State) => {
                        draft.symptoms = symtpoms
                        draft.symptomsAreLoaded = true
                    }))
                } catch (error) {
                    get().setError(error)
                }
            }
        },

        // Conditions
        postCondition: async (symptomCategoryId: number, symptomId?: number, symptomName?: string) => {
            try {
                const params: api.ConditionRequestParams = {
                    categoryId: symptomCategoryId,
                    symptomId: symptomId,
                    symptomName: symptomName
                }
                const resp = await client.api.PostCondition(get().conditionEvent.id, params)
                const condition = respToCondition(resp.condition)
                const symptoms = respToSymptoms(resp.symptoms)
                set(produce((draft: State) => {
                    draft.conditionEvent.conditions.unshift(condition)
                    if (symptoms.length > 0) {
                        draft.symptoms = symptoms
                    }

                }))
            } catch (error) {
                get().setError(error)
            }
        },
        postSymptomCategory: async (name: string): Promise<number> => {
            const params: api.PostSymptomCategoryRequest = { name: name }
            try {
                const resp = await client.api.PostSymptomCategory(params)
                set(produce((draft: State) => {
                    draft.symptoms.unshift({ categoryId: resp.id, categoryName: name, symptoms: [] })
                }))
                return resp.id
            } catch (error) {
                get().setError(error)
                return 0
            }
        },
        patchCondition: async (conditionId: number, severity: number): Promise<void> => {
            const params: api.PatchSeverityRequestParams = {
                severity: severity
            }
            try {
                await client.api.PatchCondition(conditionId, params)
                const conditionIndex = get().conditionEvent.conditions.findIndex(c => c.id == conditionId)
                set(produce((draft: State) => {
                    draft.conditionEvent.conditions[conditionIndex].severity = severity
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        deleteCondition: async (conditionId: number): Promise<void> => {
            try {
                const resp = await client.api.DeleteCondition(conditionId)
                set(produce((draft: State) => {
                    draft.conditionEvent.conditions = removeItemById(conditionId, get().conditionEvent.conditions)
                    draft.symptoms = respToSymptoms(resp)
                }))
            } catch (error) {
                get().setError(error)
            }
        }

    }))


interface Items {
    id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
    return items.filter(it => it.id != id)
}