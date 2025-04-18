import { entity } from '../../api/generatedApi'


interface MetaConditionEvent {
    id: number
    date: Date
}

export type ConditionEvents = Array<MetaConditionEvent>

export const respToConditionEvents = (resp: entity.ConditionEventsResponse): ConditionEvents => {
    return resp.conditionEvents.map(ev => (
        { id: ev.id, date: new Date(ev.date) }
    ))
}