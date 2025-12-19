import { Dayjs } from 'dayjs'
import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { PutStatusParams, respToStatus, respToStatuses, Statuses } from './status'

interface State {
    statuses: Statuses
}

interface Actions {
    resetStatus: () => void
    getStatuses: () => Promise<void>
    addStatus: (date: Dayjs) => Promise<void>
    updateStatus: (p: PutStatusParams) => Promise<void>
    deleteStatus: (id: number) => Promise<void>
}

export interface StatusStore extends State, Actions { }

const initialState: State = {
    statuses: [],
}

export const createStatusSlice: StateCreator<
    StatusStore,
    [],
    [],
    StatusStore> = (set, get) => ({
        ...initialState,
        resetStatus: () => set(initialState),
        getStatuses: async () => {
            const resp = await client.ListStatus()
            set(produce((draft: State) => {
                draft.statuses = respToStatuses(resp)
            }))
        },
        addStatus: async (date: Dayjs) => {
            const resp = await client.PostStatus({
                date: date.toISOString(),
            })
            const status = respToStatus(resp)
            set(produce((draft: State) => {
                draft.statuses.unshift(status)
                draft.statuses.sort((a, b) => b.date.diff(a.date))
            }))
        },
        updateStatus: async (p: PutStatusParams) => {
            const statusIndex = get().statuses.findIndex(s => s.id == p.statusId)
            await client.PatchStatus(p.statusId, {
                date: p.date ? p.date.toISOString() : undefined,
                eveningFitness: p.eveningFitness,
                morningFitness: p.morningFitness,
                morningSleep: p.morningSleep,
            })
            set(produce((draft: State) => {
                if (statusIndex > -1) {
                    const status = draft.statuses[statusIndex]
                    if (p.date != undefined) status.date = p.date
                    if (p.eveningFitness != undefined) status.eveningFitness = p.eveningFitness
                    if (p.morningFitness != undefined) status.morningFitness = p.morningFitness
                    if (p.morningSleep != undefined) status.morningSleep = p.morningSleep
                }
            }))
        },
        deleteStatus: async (id: number) => {
            await client.DeleteStatus(id)
            set(produce((draft: State) => {
                draft.statuses = get().statuses.filter(s => s.id != id)
            }))
        },
    })
