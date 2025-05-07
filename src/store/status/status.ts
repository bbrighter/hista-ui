import dayjs, { Dayjs } from 'dayjs'
import { entity } from '../../api/generatedApi'

export type Statuses = Array<Status>

export const respToStatuses = (resp: entity.StatusesResponse): Statuses => {
    return resp.statuses.map(s => (respToStatus(s)))
}

export interface Status {
    id: number
    date: Dayjs
    morningFitness?: number
    morningSleep?: number
    eveningFitness?: number
}

export const respToStatus = (resp: entity.StatusResponse): Status => {
    return {
        id: resp.id,
        date: dayjs(resp.date),
        morningFitness: resp.morningFitness,
        morningSleep: resp.morningSleep,
        eveningFitness: resp.eveningFitness,
    }
}


export interface PutStatusParams {
    statusId: number
    date?: Dayjs
    morningFitness?: number
    morningSleep?: number
    eveningFitness?: number
}
