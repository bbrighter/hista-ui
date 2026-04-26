import { hista } from "../../api/generatedApi"

export interface MetaConditionEvent {
  id: number
  date: Date
}

export const respToConditionEvents = (resp: hista.ConditionEventListResponse): Array<MetaConditionEvent> => {
  return resp.conditionEvents.map(ev => (
    { id: ev.id, date: new Date(ev.date) }
  ))
}
