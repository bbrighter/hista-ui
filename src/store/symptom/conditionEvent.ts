import { entity } from '../../api/generatedApi'
import { Symptom } from './symptom'

export interface ConditionEvent {
    id: number
    date: Date
    conditions: Array<{
        id: number
        symptom: Symptom
        severity: number
    }>
}

export const respToConditionEvent = (resp: entity.ConditionEventResponse): ConditionEvent => ({
    id: resp.id,
    date: new Date(resp.date),
    conditions: resp.conditions.map(c => (
        {
            id: c.id,
            severity: c.severity,
            symptom: {
                id: c.symptom.id,
                name: c.symptom.name,
                categoryId: c.symptom.categoryId,
            },
        }
    )),
})
