import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { login } from '../../api/api'
import { ErrCode, isAPIError } from '../../api/generatedApi'
import { getFirstPiidFromToken } from './tokenHandler';


interface State {
    token: string | null
    piid: string | null
}

interface Actions {
    logout: () => void
    login: (password: string, userName: string) => Promise<string | null>
    setPiid: (piid: string) => void
}

export interface AuthStore extends State, Actions { }

const initialState: State = {
    token: window.localStorage.getItem('token'),
    piid: getFirstPiidFromToken(window.localStorage.getItem('token')),
}

export const createAuthSlice: StateCreator<
    AuthStore,
    [],
    [],
    AuthStore> = ((set, get) => ({
        ...initialState,

        setPiid(piid: string) {
            set(produce((draft: State) => {
                draft.piid = piid
            }))
        },

        logout() {
            window.localStorage.removeItem('token')
            set(produce((draft: State) => {
                draft.token = null
                draft.piid = null
            }))
        },

        login: async (password: string, userName: string): Promise<string | null> => {
            const resp = await login(userName, password)
            if (isAPIError(resp)) {
                if (resp.code == ErrCode.Unauthenticated) {
                    get().logout()
                    return null
                }
                if (resp.code == ErrCode.NotFound) {
                    get().logout()
                    return null
                }
                throw (resp)
            }
            if (resp.status == ErrCode.OK) {
                const piid = getFirstPiidFromToken(resp.token)
                get().setPiid(piid)
                persistAuth(resp.token)
                return piid
            }
            if (resp.status == ErrCode.Unauthenticated) {
                get().logout()
                return null
            }
        },
    }))


const persistAuth = (token?: string) => {
    window.localStorage.setItem('token', token ?? '')
}