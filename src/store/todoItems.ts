import { api } from "../api/generatedApi"

export interface TodoItem {
    id: number
    title: string
}

export function todoItems(resp: api.TodoItems): TodoItem[] {
    return resp.items.map(i => ({
        id: i.id, title: i.title
    }))
}