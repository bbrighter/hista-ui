import { StateCreator } from 'zustand'
import { AuthStore } from '../auth/authStore'
import { ErrorStore } from '../error/errorStore'
import { addNewStatus, deleteStatus, listStatuses, putStatus, PutStatusParams, Statuses } from './status'
import { produce } from 'immer'


interface State {
    statuses: Statuses
}

interface Actions {
    getStatuses: () => Promise<void>
    addStatus: () => Promise<void>
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
        addStatus: async () => {
            try {
                const status = await addNewStatus()
                set(produce((draft: State) => {
                    draft.statuses.unshift(status)
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
        // createStatus: async (date: Dayjs, timeOfDay: 'morning' | 'evening', fitness: number, sleep?: number) => {
        //     try {
        //         const newStatus = await createStatus(date, timeOfDay, fitness, sleep)
        //         const sameDateIndex = get().statuses.findIndex(v => v.date.isSame(date, 'day'))
        //         set(produce((draft: State) => {
        //             if (sameDateIndex > -1) {
        //                 const s: Status = { date: date }
        //                 if (isMorningStatus(newStatus)) {
        //                     s.morning = newStatus
        //                 } else {
        //                     s.evening = newStatus
        //                 }
        //                 draft.statuses.unshift(s)
        //             }
        //         }))
        //     } catch (error) {
        //         get().setError(error)
        //     }
        // },
    }))