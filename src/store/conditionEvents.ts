import { symptoms } from "../api/generatedApi"


export interface MetaConditionEvent {
    id: number
    date: Date
}

export type ConditionEvents = Array<MetaConditionEvent>

export const respToConditionEvents = (resp: symptoms.ConditionEventsResponse): ConditionEvents => {
    return resp.conditionEvents.map(ev => (
        { id: ev.id, date: new Date(ev.date) }
    ))
}