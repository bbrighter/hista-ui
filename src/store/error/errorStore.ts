import { StateCreator } from 'zustand'

import { AuthStore } from '../auth/authStore'
import { toAppError } from './appError'
import { errorBus } from './errorBus'

type State = object

interface Actions {
    setError: (error: unknown) => void
}

export interface ErrorStore extends State, Actions { }

const initialState: State = {}

export const createErrorSlice: StateCreator<
    AuthStore & ErrorStore,
    [],
    [],
    ErrorStore> = (_, get) => ({
        ...initialState,

        setError: (error: unknown) => {
            const appError = toAppError(error)
            const status = appError.status
            switch (appError.source) {
            case 'api':
                switch (status) {
                case 400:
                    errorBus.emit('error', error)
                    break
                case 404:
                    break
                case 500:
                default:
                    errorBus.emit('error', error)
                }
                break
            case 'router':
            case 'unknown':
                errorBus.emit('error', error)
            }
        },
    })
