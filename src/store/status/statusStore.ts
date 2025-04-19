import { StateCreator } from 'zustand'
import { AuthStore } from '../auth/authStore'
import { ErrorStore } from '../error/errorStore'
import { PutStatusParams, respToStatus, respToStatuses, Statuses } from './status'
import { produce } from 'immer'
import { Dayjs } from 'dayjs'
import { client } from '../../api/api'


interface State {
    statuses: Statuses
}

interface Actions {
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
                const resp = await client.api.PutStatus(p.statusId, {
                    date: p.date.toISOString(),
                    fitness: p.fitness,
                    timeOfDay: p.timeOfDay,
                    sleep: p.sleep,
                    id: p.statusId,
                })
                set(produce((draft: State) => {
                    if (statusIndex > -1) {
                        draft.statuses[statusIndex] = respToStatus(resp)
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