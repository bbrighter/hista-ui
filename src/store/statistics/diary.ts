import { statistics } from "../../api/generatedApi"

export interface RawDiary {
    date: string
    hour: number
    type: DiaryEntryType
    content: string
}

type DiaryEntryType = 'Essen' | 'Symptom'

export const respToRawDiary = (resp: statistics.DiaryResp): Array<RawDiary> => {
    return resp.diaries.map(d => ({
        date: new Date(d.date).toLocaleDateString('de-DE'),
        hour: d.hour,
        type: respTypeToType(d.type),
        content: d.content
    }))
}

const respTypeToType = (resp: unknown): DiaryEntryType => {
    if (typeof (resp) == 'string' && resp != null) {
        return resp == 'Food' ? 'Essen' : 'Symptom'
    } else {
        throw ("Bad type:" + resp)
    }
}
