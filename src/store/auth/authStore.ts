import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { authApi, login } from '../../api/api'
import { ErrCode, isAPIError } from '../../api/generatedApi'
import { Permissions, toPermission } from './permissions';


interface State {
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
            set((produce((draft: State) => {
                draft.isAuthProblem = true
            })))
        },

        login: async (password: string, userName: string): Promise<boolean> => {
            const resp = await login(userName, password)
            if (isAPIError(resp)) {
                if (resp.code == ErrCode.Unauthenticated) {
                    get().logout()
                    return false
                }
                if (resp.code == ErrCode.NotFound) {
                    get().logout()
                    return false
                }
                throw (resp)
            }
            if (resp) {
                set(produce((draft: State) => {
                    draft.isAuthProblem = false
                }))
                return true
            } else {
                get().logout()
                return false
            }
        },

        getPermissions: async () => {
            if (get().permissionsSet) return
            set(produce((draft: State) => { draft.permissionsSet = 'running' }))
            try {
                const resp = await authApi.GetPermissions()
                const perms = toPermission(resp)
                set(produce((draft: State) => {
                    draft.instances = perms
                    draft.selectedPiid = perms[0].piid
                    draft.permissionsSet = true
                    draft.isAuthProblem = false
                }))
            } finally {
                set(produce((draft: State) => { draft.permissionsSet = false }))
            }

        },
    }))
