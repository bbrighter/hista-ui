import { hista } from "../../api/generatedApi"


export type Condition = {
  id: number
  symptomId: number
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
      symptomId: c.symptomId,
    }
  )),
})
