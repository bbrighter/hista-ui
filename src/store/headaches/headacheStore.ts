import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { ValueLabelPair } from '../../scenes/Headache/components/Tags'
import { Headache, HeadachePositions, HeadacheSymptoms, HeadacheTypes, respToHeadaches } from './headaches'

interface State {
    headaches: Array<Headache>
    headache: Headache
    isHeadacheLoaded: boolean
}
interface Actions {
    resetHeadaches: () => void

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
    HeadacheStore,
    [],
    [],
    HeadacheStore> = (set, get) => ({
        ...initialState,

        resetHeadaches: () => set(initialState),

        getHeadaches: async () => {
            let headaches: Array<Headache> = []
            const resp = await client.ListHeadaches()
            headaches = respToHeadaches(resp)
            set(produce((draft: State) => {
                draft.headaches = headaches
                draft.isHeadacheLoaded = true
            }))
            return headaches
        },

        getHeadache: async (id: number) => {
            if (!get().isHeadacheLoaded) {
                await get().getHeadaches()
            }
            const headache = get().headaches.find(h => h.id == id)
            set(produce((draft: State) => {
                draft.headache = headache
            }))
        },

        postHeadache: async () => {
            const date = new Date()
            const severity = 5
            const resp = await client.PostHeadache({ date: date.toISOString(), severity: severity })
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
        },

        deleteHeadache: async (id: number) => {
            await client.DeleteHeadache(id)
            set(produce((draft: State) => {
                draft.headaches = get().headaches.filter(h => h.id != id)
            }))
        },

        patchHeadacheSeverity: async (newSeverity: number) => {
            const headacheId = get().headache.id
            await client.PatchHeadacheSeverity(headacheId, { severity: newSeverity })
            set(produce((draft: State) => {
                draft.headache.severity = newSeverity
            }))
        },
        patchHeadacheDate: async (date: Date) => {
            const headacheId = get().headache.id
            await client.PatchHeadacheDate(headacheId, { date: date.toISOString() })
            set(produce((draft: State) => {
                draft.headache.date = date
            }))
        },
        patchHeadachePositions: async (pos: HeadachePositions) => {
            if (equalPositions(pos, get().headache.positions)) return
            const headacheId = get().headache.id
            if (headacheId == 0) return
            await client.PatchHeadachePositions(headacheId, { positions: pos.map(p => p.value) })
            set(produce((draft: State) => {
                draft.headache.positions = pos
            }))
        },
        patchHeadacheTypes: async (types: HeadacheTypes) => {
            if (equalPositions(types, get().headache.types)) return
            const headacheId = get().headache.id
            await client.PatchHeadacheTypes(headacheId, { types: types.map(t => t.value) })
            set(produce((draft: State) => {
                draft.headache.types = types
            }))
        },
        patchHeadacheSymptoms: async (symptoms: HeadacheSymptoms) => {
            if (equalPositions(symptoms, get().headache.symptoms)) return
            const headacheId = get().headache.id
            await client.PatchHeadacheSymptoms(headacheId, { symptoms: symptoms.map(s => s.value) })
            set(produce((draft: State) => {
                draft.headache.symptoms = symptoms
            }))
        },
        patchHeadacheDescription: async (description: string) => {
            const headacheId = get().headache.id
            await client.PatchHeadacheDescription(headacheId, { description: description })
            set(produce((draft: State) => {
                draft.headache.description = description
            }))
        },
    })

const equalPositions = (a: ValueLabelPair[], b: ValueLabelPair[]) =>
    a.length === b.length && a.every((p, i) => p.value === b[i].value)
