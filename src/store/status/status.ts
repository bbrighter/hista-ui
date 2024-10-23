import dayjs, { Dayjs } from 'dayjs'
import { client } from '../../api/api'
import { api, entity } from '../../api/generatedApi'

export type Statuses = Array<Status>

const respToStatuses = (resp: entity.StatusesResponse): Statuses => {
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

const respToStatus = (resp: entity.StatusResponse): Status => {
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


export const addNewStatus = async (): Promise<Status> => {
    const resp = await client.api.PostStatus({ date: new Date().toISOString() })
    return respToStatus(resp)
}

export interface PutStatusParams {
    statusId: number
    date: Dayjs
    timeOfDay: 'morning' | 'evening'
    fitness: number
    sleep?: number
    morningOrEveningId?: number
}

export const putStatus = async (p: PutStatusParams): Promise<Status> => {
    const params: api.StatusParams = {
        date: p.date.toISOString(),
        fitness: p.fitness,
        timeOfDay: p.timeOfDay,
        sleep: p.sleep,
        id: p.morningOrEveningId,
    }
    const resp = await client.api.PutStatus(p.statusId, params)
    return respToStatus(resp)
}

export const listStatuses = async (): Promise<Statuses> => {
    const resp = await client.api.ListStatus()
    return respToStatuses(resp)
}

export const deleteStatus = async (id: number) => {
    await client.api.DeleteStatus(id)
}