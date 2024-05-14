import { statistics } from "../../api/generatedApi"

export interface RawDiary {
    date: string
    hour: number
    type: 'Food' | 'Symptom'
    content: string
}

export const respToRawDiary = (resp: statistics.DiaryResp): Array<RawDiary> => {
    return resp.diaries.map(d => ({
        date: new Date(d.date).toLocaleDateString('de-DE'),
        hour: d.hour,
        type: respTypeToType(d.type),
        content: d.content
    }))
}

const respTypeToType = (resp: unknown): 'Food' | 'Symptom' => {
    if (typeof (resp) == 'string' && resp != null) {
        return resp == 'Food' ? 'Food' : 'Symptom'
    } else {
        throw ("Bad type:" + resp)
    }
}

export const formatDiary = async (entries: Array<RawDiary>) => {
    return entries.map(e => ({
        Datum: e.date,
        Uhrzeit: e.hour,
        Typ: e.type == 'Food' ? 'Essen' : 'Symptom',
        Was: e.content,
    }))
}