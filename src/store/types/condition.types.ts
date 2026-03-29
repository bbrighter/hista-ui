import { entity } from "../../api/generatedApi"
import { MuiSliderColor } from "../../types"
import { respToSymptom, Symptom } from "./symptom.types"

interface Condition {
  id: number
  symptom: Symptom
  severity: number
}

export const respToCondition = (resp: entity.ConditionResponse): Condition => ({
  id: resp.id,
  symptom: respToSymptom(resp.symptom),
  severity: resp.severity,
})

export const colorFromSeverity = (severity: number | Array<number>): MuiSliderColor => {
  let sev = severity
  if (Array.isArray(severity)) {
    sev = Math.max(...severity)
  }
  switch (sev) {
    case 1: return "success"
    case 2: return "primary"
    case 3: return "secondary"
    case 4: return "warning"
    case 5: return "error"
  }
}
