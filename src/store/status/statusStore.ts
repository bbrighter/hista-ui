import { StateCreator } from 'zustand'
import { AuthStore } from '../auth/authStore'
import { ErrorStore } from '../error/errorStore'
import { addNewStatus, deleteStatus, listStatuses, putStatus, PutStatusParams, Statuses } from './status'
import { produce } from 'immer'
import { Dayjs } from 'dayjs'


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
                const statuses = await listStatuses()
                set(produce((draft: State) => {
                    draft.statuses = statuses
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        addStatus: async (date: Dayjs) => {
            try {
                const status = await addNewStatus(date)
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
                const status = await putStatus(p)
                set(produce((draft: State) => {
                    if (statusIndex > -1) {
                        draft.statuses[statusIndex] = status
                    }
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        deleteStatus: async (id: number) => {
            try {
                await deleteStatus(id)
                set(produce((draft: State) => {
                    draft.statuses = get().statuses.filter(s => s.id != id)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
    }))