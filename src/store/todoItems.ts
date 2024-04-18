import { api1 } from "../api/generatedApi"

export interface TodoItem {
    id: number
    title: string
}

export function todoItems(resp: api1.TodoItems): TodoItem[] {
    return resp.items.map(i => ({
        id: i.id, title: i.title
    }))
}