import { create } from "zustand"
import { TodoItem, todoItems } from "./todoItems"
import { client, is401Response } from "../api/api"
import { produce } from "immer"
import { api1 } from "../api/generatedApi"

interface State {
    isAuthenticated: boolean
    todoItems: TodoItem[]
}

interface Actions {
    logout: () => void
    login: (password: string, userName: string) => Promise<boolean>
    get: () => Promise<void>
    post: (title: string) => Promise<void>
}

interface Store extends State, Actions { }

const initialState: State = {
    isAuthenticated: window.sessionStorage.isAuthenticated || false,
    todoItems: []
}

const useHista = create<Store>((set, get) => ({
    ...initialState,

    logout() { set(produce((draft: State) => { draft.isAuthenticated = false })) },
    login: async (password, userName) => {
        const params: api1.AuthParams = { Password: password, User: userName }
        let isAuthenticated = false
        try {
            const token = await client.api1.Auth(params)
            isAuthenticated = true
            window.sessionStorage.token = token.Bearer
            window.sessionStorage.user = token.User
        } catch (error) {
            if (is401Response(error)) {
                isAuthenticated = false
            }
        } finally {
            window.sessionStorage.isAuthenticated = isAuthenticated
            set(produce((draft: State) => {
                draft.isAuthenticated = isAuthenticated
            }))
        }
        return get().isAuthenticated
    },

    get: async () => {
        try {
            const resp = await client.api1.Get()
            const items = todoItems(resp)
            set((produce((draft: State) => {
                draft.todoItems = items
            })))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },

    post: async (title: string) => {
        const params: api1.PostParams = { title: title }
        try {
            await client.api1.Post(params)
            set((produce((draft: State) => {
                draft.todoItems.push({ title: title, id: 10000 })
            })))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },

}))

export default useHista