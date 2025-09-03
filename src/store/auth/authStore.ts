import { StateCreator } from 'zustand'

import { login } from '../../api/api'
import { ErrCode } from '../../api/generatedApi'
import { ErrorStore } from '../error/errorStore'


interface State {
    isAuthenticated: boolean
}

interface Actions {
    logout: () => void
    login: (password: string, userName: string) => Promise<void>
}

export interface AuthStore extends State, Actions { }

const initialState: State = {
    isAuthenticated: window.localStorage.getItem('isAuthenticated') === 'true' || false,
}

export const createAuthSlice: StateCreator<
    AuthStore & ErrorStore,
    [],
    [],
    AuthStore> = ((set, get) => ({
        ...initialState,

        logout() {
            clearAuth()
            set({ isAuthenticated: false })
        },

        login: async (password: string, userName: string) => {
            const resp = await login(userName, password)
            if (resp.status == ErrCode.OK) {
                set({ isAuthenticated: true })
                persistAuth(true, resp.token, userName)
                return
            }
            if (resp.status == ErrCode.Unauthenticated) {
                clearAuth()
                return
            }

            if (resp.status == ErrCode.Internal) {
                get().setError(resp)
                return
            }

            persistAuth(false)
            set({ isAuthenticated: false })
        },
    }))


const persistAuth = (isAuthenticated: boolean, token?: string, user?: string) => {
    window.localStorage.setItem('isAuthenticated', String(isAuthenticated))
    window.localStorage.setItem('token', token ?? '')
    window.localStorage.setItem('user', user)
}

const clearAuth = () => {
    window.localStorage.removeItem('isAuthenticated')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
}