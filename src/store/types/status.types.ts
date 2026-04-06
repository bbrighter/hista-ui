import dayjs, { Dayjs } from "dayjs"

import { entity } from "../../api/generatedApi"

export type Statuses = Array<Status>

export const respToStatuses = (resp: entity.StatusesResponse): Statuses => {

  return resp.statuses.map(s => {
    const isToday = dayjs(s.date).isSame(dayjs(), "date")
    return respToStatus(s, !isToday)    
  })
}

export interface Status {
  id: number
  date: Dayjs
  morningFitness?: number
  morningSleep?: number
  eveningFitness?: number
  locked?: boolean
}

export const respToStatus = (resp: entity.StatusResponse, locked?: boolean): Status => {
  return {
    id: resp.id,
    date: dayjs(resp.date),
    morningFitness: resp.morningFitness,
    morningSleep: resp.morningSleep,
    eveningFitness: resp.eveningFitness,
    locked: locked,
  }
}

export interface PutStatusParams {
  statusId: number
  date: Dayjs
  morningFitness?: number
  morningSleep?: number
  eveningFitness?: number
}
