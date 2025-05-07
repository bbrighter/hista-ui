import { entity } from '../../api/generatedApi'
import { respToSymptom,Symptom } from './symptom'

type Severity = 5 | 4 | 3 | 2 | 1

interface Condition {
    id: number
    symptom: Symptom
    severity: Severity
}

export const respToCondition = (resp: entity.ConditionResponse): Condition => {
    return {
        id: resp.id,
        symptom: respToSymptom(resp.symptom),
        severity: respToSeverity(resp.severity),
    }
}

const respToSeverity = (resp: unknown): Severity => {
    if (typeof (resp) == 'number' && [1, 2, 3, 4, 5].includes(resp)) { return resp as Severity }
    else { return 1 as Severity }
}

export const colorFromSeverity = (severity: number | Array<number>) => {
    let sev = severity
    if (Array.isArray(severity)) {
        sev = Math.max(...severity)
    }
    switch (sev) {
        case 1:
            return 'success'
        case 2:
            return 'primary'
        case 3:
            return 'secondary'
        case 4:
            return 'warning'
        case 5:
            return 'error'
    }
}