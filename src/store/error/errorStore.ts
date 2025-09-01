import { produce } from 'immer'
import { ErrorResponse } from 'react-router-dom'
import { StateCreator } from 'zustand'

import { isAPIError } from '../../api/generatedApi'
import { AuthStore } from '../auth/authStore'

type State = {
    error?: ErrorResponse
}

interface Actions {
    setError: (error: unknown) => void
    resetError: () => void
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
                                statusText: error.message,
                                status: error.status,
                                data: { message: error.details },
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
                                statusText: error.message,
                                status: error.status,
                                data: { message: error.details },
                            }
                        }))
                        break
                }
            } else {
                alert('Unbekannter Fehler: ' + error)
            }
        },
        resetError: () => { set(initialState) },
    }))