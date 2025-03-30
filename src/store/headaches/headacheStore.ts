import { StateCreator } from 'zustand'
import { ErrorStore } from '../error/errorStore'
import { Headache, HeadachePositions, HeadacheSymptoms, HeadacheTypes, respToHeadaches } from './headaches'
import { client } from '../../api/api'
import { produce } from 'immer'

interface State {
    headaches: Array<Headache>
    headache: Headache
}
interface Actions {
    getHeadaches(): Promise<void>
    getHeadache(id: number): Promise<void>
    postHeadache(): Promise<number>
    deleteHeadache(id: number): Promise<void>

    patchHeadacheSeverity(newSeverity: number): Promise<void>
    patchHeadacheDate(date: Date): Promise<void>
    patchHeadachePositions(pos: HeadachePositions): Promise<void>
    patchHeadacheTypes(types: HeadacheTypes): Promise<void>
    patchHeadacheSymptoms(symptoms: HeadacheSymptoms): Promise<void>
}

export interface HeadacheStore extends State, Actions { }

const initialState: State = {
    headaches: [],
    headache: { id: 0, date: new Date(), positions: [], symptoms: [], types: [], severity: 0 },
}

export const createHeadacheSlice: StateCreator<
    HeadacheStore & ErrorStore,
    [],
    [],
    HeadacheStore> = ((set, get) => ({
        ...initialState,

        getHeadaches: async () => {
            try {
                const resp = await client.api.GetHeadaches()
                set(produce((draft: State) => {
                    draft.headaches = respToHeadaches(resp)
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        getHeadache: async (id: number) => {
            try {
                if (get().headaches.length == 0) {
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
    }))