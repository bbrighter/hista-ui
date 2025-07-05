import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { isAPIError } from '../../api/generatedApi'
import { AuthStore } from '../auth/authStore'

type HistaError = {
    statusText: string
    status: number
    data?: {
        message: string
    }
}

type State = {
    error?: HistaError
    isError: boolean
}

interface Actions {
    setError: (error: unknown) => void
    resetError: () => void
}

export interface ErrorStore extends State, Actions { }

const initialState: State = { isError: false }

export const createErrorSlice: StateCreator<
    AuthStore & ErrorStore,
    [],
    [],
    ErrorStore> = ((set, get) => ({
        ...initialState,

        setError: (error: unknown) => {
            if (isAPIError(error)) {
                const status = error.status
                switch (status) {
                    case 401:
                        get().logout()
                        break
                    case 500:
                        set(produce((draft: State) => {
                            draft.error = {
                                statusText: error.message,
                                status: error.status,
                                data: { message: error.details },
                            }
                            draft.isError = true
                        }))
                        break
                    case 400:
                        if (error.message == 'invalid uuid') {
                            get().logout()
                            break
                        }
                        set(produce((draft: State) => {
                            draft.error = {
                                statusText: error.message,
                                status: error.status,
                                data: { message: error.details },
                            }
                            draft.isError = true
                        }))
                        break
                }
            } else {
                alert('Unbekannter Fehler: ' + error)
            }
        },
        resetError: () => { set(initialState) },
    }))