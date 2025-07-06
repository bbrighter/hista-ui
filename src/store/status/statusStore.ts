import { Dayjs } from 'dayjs'
import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { AuthStore } from '../auth/authStore'
import { ErrorStore } from '../error/errorStore'
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
    AuthStore & ErrorStore & StatusStore,
    [],
    [],
    StatusStore> = ((set, get) => ({
        ...initialState,
        resetStatus: () => set(initialState),
        getStatuses: async () => {
            try {
                const resp = await client.api.ListStatus()
                set(produce((draft: State) => {
                    draft.statuses = respToStatuses(resp)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        addStatus: async (date: Dayjs) => {
            try {
                const resp = await client.api.PostStatus({
                    date: date.toISOString(),
                })
                const status = respToStatus(resp)
                set(produce((draft: State) => {
                    draft.statuses.unshift(status)
                    draft.statuses.sort((a, b) => b.date.diff(a.date))
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        updateStatus: async (p: PutStatusParams) => {
            try {
                const statusIndex = get().statuses.findIndex(s => s.id == p.statusId)
                await client.api.PatchStatus(p.statusId, {
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
            } catch (error) {
                get().setError(error)
            }
        },
        deleteStatus: async (id: number) => {
            try {
                await client.api.DeleteStatus(id)
                set(produce((draft: State) => {
                    draft.statuses = get().statuses.filter(s => s.id != id)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
    }))