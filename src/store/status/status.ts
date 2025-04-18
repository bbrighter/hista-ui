import dayjs, { Dayjs } from 'dayjs'
import { entity } from '../../api/generatedApi'

export type Statuses = Array<Status>

export const respToStatuses = (resp: entity.StatusesResponse): Statuses => {
    return resp.statuses.map(s => (
        {
            id: s.id,
            date: dayjs(s.date),
            ...(s.morning && { morning: { timeOfDay: 'morning', ...s.morning } }),
            ...(s.evening && { evening: { timeOfDay: 'evening', ...s.evening } }),
        }
    ))
}

export interface Status {
    id: number
    date: Dayjs
    morning?: MorningStatus
    evening?: EveningStatus
}

export const respToStatus = (resp: entity.StatusResponse): Status => {
    return {
        id: resp.id,
        date: dayjs(resp.date),
        morning: respToMorning(resp.morning),
        evening: respToEvening(resp.evening),
    }
}


interface MorningStatus {
    id: number
    fitness: number
    sleep: number
    timeOfDay: 'morning'
}

const respToMorning = (resp: entity.MorningStatus | undefined): MorningStatus | undefined => {
    return resp ? {
        id: resp.id,
        fitness: resp.fitness,
        sleep: resp.sleep,
        timeOfDay: 'morning',
    } : undefined
}

interface EveningStatus {
    id: number
    fitness: number
    timeOfDay: 'evening'
}

const respToEvening = (resp: entity.EveningStatus | undefined): EveningStatus | undefined => {
    return resp ? {
        id: resp.id,
        fitness: resp.fitness,
        timeOfDay: 'evening',
    } : undefined
}


export interface PutStatusParams {
    statusId: number
    date: Dayjs
    timeOfDay: 'morning' | 'evening'
    fitness: number
    sleep?: number
    morningOrEveningId?: number
}
