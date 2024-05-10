import { StateCreator } from "zustand"
import { client } from "../../api/api"
import { produce } from "immer"
import { symptoms } from "../../api/generatedApi"
import { ConditionEvents, respToConditionEvents } from "./conditionEvents"
import { ConditionEvent, respToConditionEvent } from "./conditionEvent"
import { SymptomCategories, respToSymptoms } from "./symptom"
import { respToCondition } from "./condition"
import { AuthStore } from "../auth/authStore"
import { MealStore } from "../meal/mealStore"
import { ErrorStore } from "../error/errorStore"

interface State {
    conditionEvents: ConditionEvents
    conditionEvent: ConditionEvent
    symptoms: SymptomCategories
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
    postConditionByName: (symptomName: string, symptomCategoryId: number) => Promise<void>,
    postConditionById: (symtpomId: number) => Promise<void>,

    // Condition
    patchCondition: (conditionId: number, severity: number) => Promise<void>,
    deleteCondition: (conditionId: number) => Promise<void>,
}

export interface SymptomStore extends State, Actions { }

const initialState: State = {
    conditionEvents: [],
    conditionEvent: { id: 0, date: new Date(), conditions: [] },
    symptoms: [],
}

export const createSymptomSlice: StateCreator<
    AuthStore & ErrorStore & MealStore & SymptomStore,
    [],
    [],
    SymptomStore> = ((set, get) => ({
        ...initialState,

        // ConditionEvents
        getConditionEvents: async () => {
            try {
                const resp = await client.symptoms.GetConditionEvents()
                const states = respToConditionEvents(resp)
                set(produce((draft: State) => {
                    draft.conditionEvents = states
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        postConditionEvent: async () => {
            const date = new Date()
            const params: symptoms.ConditionEventRequestParams = { date: date.toISOString() }
            try {
                const resp = await client.symptoms.CreateConditionEvent(params)
                set(produce((draft: State) => {
                    draft.conditionEvents.unshift({ id: resp.id, date: date })
                }))
                return resp.id
            } catch (error) {
                get().setError(error)
            }
        },

        // ConditionEvent
        getConditionEvent: async (eventId: number) => {
            try {
                const resp = await client.symptoms.GetConditionEvent(eventId)
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
                await client.symptoms.DeleteConditionEvent(eventId)
                set(produce((draft: State) => {
                    draft.conditionEvents = removeItemById(eventId, get().conditionEvents)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        setConditionEventDate: async (date: Date) => {
            try {
                const params: symptoms.ConditionEventRequestParams = { date: date.toISOString() }
                await client.symptoms.PatchDate(get().conditionEvent.id, params)
                set(produce((draft: State) => {
                    draft.conditionEvent.date = date
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        // Symtpoms
        getSymptoms: async () => {
            try {
                const resp = await client.symptoms.GetSymptoms()
                const symtpoms = respToSymptoms(resp)
                set(produce((draft: State) => {
                    draft.symptoms = symtpoms
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        // Conditions
        postConditionByName: async (symptomName: string, symptomCategoryId: number) => {
            try {
                const params: symptoms.ConditionRequestParams = {
                    categoryId: symptomCategoryId,
                    symptomName: symptomName
                }
                const resp = await client.symptoms.PostCondition(get().conditionEvent.id, params)
                const condition = respToCondition(resp.condition)
                const symptoms = respToSymptoms(resp.symptoms)
                set(produce((draft: State) => {
                    draft.conditionEvent.conditions.unshift(condition)
                    draft.symptoms = symptoms
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        postConditionById: async (symptomId: number) => {
            try {
                const resp = await client.symptoms.PostConditionBySymptomID(get().conditionEvent.id, symptomId)
                const condition = respToCondition(resp)
                set(produce((draft: State) => {
                    draft.conditionEvent.conditions.unshift(condition)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        postSymptomCategory: async (name: string): Promise<number> => {
            const params: symptoms.PostSymptomCategoryRequest = { name: name }
            try {
                const resp = await client.symptoms.PostSymptomCategory(params)
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
            const params: symptoms.PatchSeverityRequestParams = {
                severity: severity
            }
            try {
                await client.symptoms.PatchCondition(conditionId, params)
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
                const resp = await client.symptoms.DeleteCondition(conditionId)
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