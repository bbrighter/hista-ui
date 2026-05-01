import dayjs, { Dayjs } from "dayjs"

import { hista } from "../../api/generatedApi"

export const respToStatuses = (resp: hista.StatusListResponse): Array<Status> => {

  return resp.statuses.map(s => {
    const isToday = dayjs(s.date).isSame(dayjs(), "date")
    return respToStatus(s, !isToday)    
  })
}

export interface Status {
  id: number
  date: Dayjs
  morningFitness: number | null
  morningSleep: number | null
  eveningFitness: number | null
  locked?: boolean
}

export const respToStatus = (resp: hista.StatusResponse, locked?: boolean): Status => {
  return {
    id: resp.id,
    date: dayjs(resp.date),
    morningFitness: resp?.morningFitness ?? null,
    morningSleep: resp?.morningSleep ?? null,
    eveningFitness: resp?.eveningFitness ?? null,
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
