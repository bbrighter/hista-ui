import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { ValueLabelPair } from '../../scenes/Headache/components/Tags'
import { ErrorStore } from '../error/errorStore'
import { Headache, HeadachePositions, HeadacheSymptoms, HeadacheTypes, respToHeadaches } from './headaches'

interface State {
    headaches: Array<Headache>
    headache: Headache
    isHeadacheLoaded: boolean
}
interface Actions {
    resetHeadaches: () => void,

    getHeadaches(): Promise<Array<Headache>>
    getHeadache(id: number): Promise<void>
    postHeadache(): Promise<number>
    deleteHeadache(id: number): Promise<void>

    patchHeadacheSeverity(newSeverity: number): Promise<void>
    patchHeadacheDate(date: Date): Promise<void>
    patchHeadachePositions(pos: HeadachePositions): Promise<void>
    patchHeadacheTypes(types: HeadacheTypes): Promise<void>
    patchHeadacheSymptoms(symptoms: HeadacheSymptoms): Promise<void>
    patchHeadacheDescription(description: string): Promise<void>
}

export interface HeadacheStore extends State, Actions { }

const initialState: State = {
    headaches: [],
    headache: { id: 0, date: new Date(), positions: [], symptoms: [], types: [], severity: 0, description: '' },
    isHeadacheLoaded: false,
}

export const createHeadacheSlice: StateCreator<
    HeadacheStore & ErrorStore,
    [],
    [],
    HeadacheStore> = ((set, get) => ({
        ...initialState,

        resetHeadaches: () => set(initialState),

        getHeadaches: async () => {
            let headaches: Array<Headache> = []
            try {
                const resp = await client.api.GetHeadaches()
                headaches = respToHeadaches(resp)
                set(produce((draft: State) => {
                    draft.headaches = headaches
                    draft.isHeadacheLoaded = true
                }))
            } catch (error) {
                get().setError(error)
            }
            return headaches
        },

        getHeadache: async (id: number) => {
            try {
                if (!get().isHeadacheLoaded) {
                    await get().getHeadaches()
                }
                const headache = get().headaches.find(h => h.id == id)
                set(produce((draft: State) => {
                    draft.headache = headache
                }))
            } catch (e) {
                get().setError(e)
            }
        },

        postHeadache: async () => {
            try {
                const date = new Date()
                const severity = 5
                const resp = await client.api.PostHeadache({ date: date.toISOString(), severity: severity })
                set(produce((draft: State) => {
                    draft.headaches.unshift({
                        id: resp.id,
                        date: date,
                        severity: severity,
                        positions: [],
                        symptoms: [],
                        types: [],
                        description: '',
                    })
                }))
                return resp.id
            } catch (error) {
                get().setError(error)
            }
        },

        deleteHeadache: async (id: number) => {
            try {
                await client.api.DeleteHeadache(id)
                set(produce((draft: State) => {
                    draft.headaches = get().headaches.filter(h => h.id != id)
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        patchHeadacheSeverity: async (newSeverity: number) => {
            const headacheId = get().headache.id
            try {
                await client.api.PatchHeadacheSeverity(headacheId, { severity: newSeverity })
                set(produce((draft: State) => {
                    draft.headache.severity = newSeverity
                }))
            } catch (e) {
                get().setError(e)
            }
        },
        patchHeadacheDate: async (date: Date) => {
            const headacheId = get().headache.id
            try {
                await client.api.PatchHeadacheDate(headacheId, { date: date.toISOString() })
                set(produce((draft: State) => {
                    draft.headache.date = date
                }))
            } catch (e) {
                get().setError(e)
            }
        },
        patchHeadachePositions: async (pos: HeadachePositions) => {
            if (equalPositions(pos, get().headache.positions)) return
            const headacheId = get().headache.id
            if (headacheId == 0) return
            try {
                await client.api.PatchHeadachePositions(headacheId, { positions: pos.map(p => p.value) })
                set(produce((draft: State) => {
                    draft.headache.positions = pos
                }))
            } catch (e) {
                get().setError(e)
            }
        },
        patchHeadacheTypes: async (types: HeadacheTypes) => {
            if (equalPositions(types, get().headache.types)) return
            const headacheId = get().headache.id
            try {
                await client.api.PatchHeadacheTypes(headacheId, { types: types.map(t => t.value) })
                set(produce((draft: State) => {
                    draft.headache.types = types
                }))
            } catch (e) {
                get().setError(e)
            }

        },
        patchHeadacheSymptoms: async (symptoms: HeadacheSymptoms) => {
            if (equalPositions(symptoms, get().headache.symptoms)) return
            const headacheId = get().headache.id
            try {
                await client.api.PatchHeadacheSymptoms(headacheId, { symptoms: symptoms.map(s => s.value) })
                set(produce((draft: State) => {
                    draft.headache.symptoms = symptoms
                }))
            } catch (e) {
                get().setError(e)
            }
        },
        patchHeadacheDescription: async (description: string) => {
            const headacheId = get().headache.id
            try {
                await client.api.PatchHeadacheDescription(headacheId, { description: description })
                set(produce((draft: State) => {
                    draft.headache.description = description
                }))
            } catch (e) {
                get().setError(e)
            }
        },
    }))


const equalPositions = (a: ValueLabelPair[], b: ValueLabelPair[]) =>
    a.length === b.length && a.every((p, i) => p.value === b[i].value)