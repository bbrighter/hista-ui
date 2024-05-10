import { StateCreator } from "zustand"
import { client, is401Response } from "../../api/api"
import { produce } from "immer"
import { internalAuth } from "../../api/generatedApi"
import { SymptomStore } from "../symptom/symptomStore"
import { MealStore } from "../meal/mealStore"


interface State {
    isAuthenticated: boolean
}

interface Actions {
    // Auth
    logout: () => void
    login: (password: string, userName: string) => Promise<boolean>
}

export interface AuthStore extends State, Actions { }

const initialState: State = {
    isAuthenticated: window.localStorage.isAuthenticated || false,
}

export const createAuthSlice: StateCreator<AuthStore & MealStore & SymptomStore, [], [], AuthStore> = ((set, get) => ({
    ...initialState,

    logout() { set(produce((draft: State) => { draft.isAuthenticated = false })) },
    login: async (password, userName) => {
        const params: internalAuth.AuthParams = { Password: password, UserId: userName }
        let isAuthenticated = false
        try {
            const token = await client.api.Login(params)
            isAuthenticated = true
            window.localStorage.token = token.Bearer
            window.localStorage.user = token.UserId
        } catch (error) {
            if (is401Response(error)) {
                isAuthenticated = false
            }
        } finally {
            window.localStorage.isAuthenticated = isAuthenticated
            set(produce((draft: State) => {
                draft.isAuthenticated = isAuthenticated
            }))
        }
        return get().isAuthenticated
    },
}))