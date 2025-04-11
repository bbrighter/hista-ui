import { StateCreator } from 'zustand'
import { login } from '../../api/api'
import { produce } from 'immer'
import { ErrorStore } from '../error/errorStore'
import { ErrCode } from '../../api/generatedApi'


interface State {
    isAuthenticated: boolean
}

interface Actions {
    logout: () => void
    login: (password: string, userName: string) => Promise<boolean>
}

export interface AuthStore extends State, Actions { }

const initialState: State = {
    isAuthenticated: window.localStorage.isAuthenticated || false,
}

export const createAuthSlice: StateCreator<
    AuthStore & ErrorStore,
    [],
    [],
    AuthStore> = ((set, get) => ({
        ...initialState,

        logout() {
            set(produce((draft: State) => {
                draft.isAuthenticated = false
                window.localStorage.isAuthenticated = false
                window.localStorage.token = ''
                window.localStorage.user = ''
            }))
        },
        login: async (password, userName) => {
            let isAuthenticated = false

            const resp = await login(userName, password)
            if (resp.status == ErrCode.OK) {
                isAuthenticated = true
                window.localStorage.token = resp.token
                window.localStorage.user = userName
            } else {
                isAuthenticated = false
                if (resp.status == ErrCode.Internal) {
                    alert('Login furchtbar schiefgegangen!')
                } else {
                    alert('Login fehlgeschlagen: ' + resp.status + ': ' + resp.details)
                }
            }

            window.localStorage.isAuthenticated = isAuthenticated
            set(produce((draft: State) => {
                draft.isAuthenticated = isAuthenticated
            }))

            return get().isAuthenticated
        },
    }))