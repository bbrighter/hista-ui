import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { isAPIError } from '../../api/generatedApi'
import { AuthStore } from '../auth/authStore'

type HistaError = {
    message: string
    status: number
    detail?: string
}

type State = {
    error?: HistaError
}

interface Actions {
    setError: (error: unknown) => void
}

export interface ErrorStore extends State, Actions { }

const initialState: State = {}

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
                                message: error.message,
                                status: error.status,
                                detail: error.details,
                            }
                        }))
                        break
                    case 400:
                        if (error.message == 'invalid uuid') {
                            get().logout()
                            break
                        }
                        set(produce((draft: State) => {
                            draft.error = {
                                message: error.message,
                                status: error.status,
                                detail: error.details,
                            }
                        }))
                        break
                }
            } else {
                alert('Unbekannter Fehler: ' + error)
            }
        },
    }))