import { statistics } from "../../api/generatedApi"
import { mealConstants } from "../../constants"

export interface RawDiary {
    Datum: string
    Stunde: number
    Typ: DiaryEntryType
    Was: string
    Schwere: string
    Kategorie: string
}

type DiaryEntryType = 'Essen' | 'Symptom'

export const respToRawDiary = (resp: statistics.DiaryResp): Array<RawDiary> => {
    return resp.diaries.map(d => ({
        Datum: new Date(d.date).toLocaleDateString('de-DE'),
        Stunde: d.hour,
        Was: d.content,
        Kategorie: d.category,
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

const respToTypeAndSeverity = (resp: statistics.RawDiary): { Typ: DiaryEntryType, Schwere: string } => {
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
    return { Typ: type, Schwere: severity }
}