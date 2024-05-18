import { statistics } from "../../api/generatedApi"
import { mealConstants } from "../../constants"

export interface RawDiary {
    date: string
    hour: number
    type: DiaryEntryType
    content: string
    severity: string
    category: string
}

type DiaryEntryType = 'Essen' | 'Symptom'

export const respToRawDiary = (resp: statistics.DiaryResp): Array<RawDiary> => {
    return resp.diaries.map(d => ({
        date: new Date(d.date).toLocaleDateString('de-DE'),
        hour: d.hour,
        content: d.content,
        category: d.category,
        ...respToTypeAndSeverity(d)
    }))
}

const respTypeToType = (resp: string): DiaryEntryType => {
    switch (resp) {
        case "Food":
            return "Essen"
        case "Symptom":
            return "Symptom"
        default:
            throw ("invalid type: " + resp)
    }

}

const respToTypeAndSeverity = (resp: statistics.RawDiary): { type: DiaryEntryType, severity: string } => {
    const type = respTypeToType(resp.type)
    let severity = ""
    if (type == 'Essen') {
        switch (resp.severity) {
            case "raw":
                severity = mealConstants.RAW
                break
            case "cooked":
                severity = mealConstants.COOKED
                break
            default:
                throw ("invalid severity: " + resp.severity)
        }
    } else {
        severity = resp.severity
    }
    return { type: type, severity: severity }
}