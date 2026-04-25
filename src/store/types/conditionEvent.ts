import { hista } from "../../api/generatedApi"
import { Symptom } from "./symptom.types"


export type Condition = {
  id: number
  symptom: Symptom
  severity: number
}

export interface ConditionEvent {
  id: number
  date: Date
  conditions: Array<Condition>
}

export const respToConditionEvent = (resp: hista.ConditionEventResponse): ConditionEvent => ({
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
