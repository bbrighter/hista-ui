import { create } from "zustand"
import { TodoItem, todoItems } from "./todoItems"
import { client } from "../api/api"
import { produce } from "immer"
import { api1 } from "../api/generatedApi"

interface State {
    todoItems: TodoItem[]
}

interface Actions {
    get: () => Promise<void>,
    post: (title: string) => Promise<void>
}

interface Store extends State, Actions { }

const initialState: State = {
    todoItems: []
}

const useHista = create<Store>((set) => ({
    ...initialState,

    get: async () => {
        const resp = await client.api1.Get()
        const items = todoItems(resp)
        set((produce((draft: State) => {
            draft.todoItems = items
        })))
        console.log(client)
    },

    post: async (title: string) => {
        const params: api1.PostParams = { title: title }
        try {
            await client.api1.Post(params)
            set((produce((draft: State) => {
                draft.todoItems.push({ title: title, id: 10000 })
            })))
        } catch {
            console.log('Error!')
        }
    },

}))

export default useHista