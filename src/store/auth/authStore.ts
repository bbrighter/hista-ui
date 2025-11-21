import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { authApi } from '../../api/api'
import { ErrCode, isAPIError } from '../../api/generatedApi'
import { Permissions, toPermission } from './permissions';


interface State {
    token: string
    selectedPiid: string | null
    instances: Permissions
    permissionsSet: boolean | 'running'
    isLoggedIn: boolean
    isAuthProblem: boolean
}

interface Actions {
    logout: () => void
    login: (password: string, userName: string) => Promise<boolean>
    getPermissions: () => Promise<void>
    setPiid: (piid: string) => void
}

export interface AuthStore extends State, Actions { }

const initialState: State = {
    token: window.localStorage.getItem('token') || '',
    selectedPiid: null,
    instances: [],
    permissionsSet: false,
    isLoggedIn: false,
    isAuthProblem: false,
}

export const createAuthSlice: StateCreator<
    AuthStore,
    [],
    [],
    AuthStore> = ((set, get) => ({
        ...initialState,

        setPiid(piid: string) {
            set(produce((draft: State) => {
                draft.selectedPiid = piid
            }))
        },

        logout() {
            window.localStorage.removeItem('token')
            set((produce((draft: State) => {
                draft.isAuthProblem = true
            })))
        },

        login: async (password: string, userName: string): Promise<boolean> => {
            try {
                const resp = await authApi.Login({ password: password, userName: userName })
                set(produce((draft: State) => {
                    draft.isAuthProblem = false
                    draft.token = resp.token
                }))
                window.localStorage.setItem('token', resp.token)
                return true
            } catch (err: unknown) {
                if (isAPIError(err)) {
                    if (err.code == ErrCode.Unauthenticated || err.code == ErrCode.NotFound) {
                        get().logout()
                        return false
                    } else {
                        get().logout()
                        return false
                    }
                }
            }
        },

        getPermissions: async () => {
            if (get().permissionsSet) return
            set(produce((draft: State) => { draft.permissionsSet = 'running' }))
            try {
                const resp = await authApi.GetPermissions()
                const perms = toPermission(resp)
                const relevantPiid = perms.find(p => p.apps['user-management']).piid // TODO: use a better app name in the backend and here
                set(produce((draft: State) => {
                    draft.instances = perms
                    draft.selectedPiid = relevantPiid
                    draft.permissionsSet = true
                    draft.isAuthProblem = false
                }))
            } catch {
                set(produce((draft: State) => { draft.permissionsSet = false }))
            }

        },
    }))