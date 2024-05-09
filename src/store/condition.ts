import { symptoms } from "../api/generatedApi"
import { Symptom, respToSymptom } from "./symptom"

type Severity = 5 | 4 | 3 | 2 | 1

export interface Condition {
    id: number
    symptom: Symptom
    severity: Severity
}

export const respToCondition = (resp: symptoms.ConditionResponse): Condition => {
    return {
        id: resp.id,
        symptom: respToSymptom(resp.symptom),
        severity: respToSeverity(resp.severity)
    }
}

const respToSeverity = (resp: unknown): Severity => {
    if (typeof (resp) == 'number' && [1, 2, 3, 4, 5].includes(resp)) { return resp as Severity }
    else { return 1 as Severity }
}