import { hista } from "../../api/generatedApi"
import { mealConstants } from "../../constants"

export interface RawDiary {
  Date: Date
  Type: DiaryEntryType
  What: string
  Severity: string
  Category: string
}

type DiaryEntryType = "Essen" | "Symptom" | "Notiz" | "Pollen" | "Medikament"

export const respToRawDiary = (resp: hista.DiaryRespList): Array<RawDiary> => {
  return resp.diaries.map(d => ({
    Date: new Date(d.date),
    What: d.content,
    Category: d.category,
    ...respToTypeAndSeverity(d),
  }))
}

const respTypeToType = (resp: string): DiaryEntryType => {
  switch (resp) {
    case "Food":
      return "Essen"
    case "Symptom":
      return "Symptom"
    case "Note":
      return "Notiz"
    case "Pollen":
      return "Pollen"
    case "Intake":
      return "Medikament"
    default:
      throw ("invalid type: " + resp)
  }
}

const respToTypeAndSeverity = (resp: hista.DiaryResp): { Type: DiaryEntryType, Severity: string } => {
  const type = respTypeToType(resp.type)
  let severity = ""
  if (type == "Essen") {
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
  }
  else {
    severity = resp.severity
  }
  return { Type: type, Severity: severity }
}
