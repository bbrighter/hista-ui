import { entity } from '../../api/generatedApi'

export interface Headache {
    id: number
    date: Date
    severity: number
    positions: HeadachePositions
    types: HeadacheTypes
    symptoms: HeadacheSymptoms
}

export type HeadachePosition = 'front' | 'back' | 'both' | 'left' | 'right' | 'neck' | 'ear' | 'temple'
export type HeadachePositions = Array<HeadachePosition>


export type HeadacheType = 'pulsating-pounding' | 'dull-pressing' | 'stabbing'
export type HeadacheTypes = Array<HeadacheType>

export type HeadacheSymptom = 'short-term memory' | 'tinnitus' | 'light-sensitive' | 'noise-sensitive' | 'odor-sensitive' | 'dizziness' | 'lack of concentration' | 'tired' | 'exhausted'
export type HeadacheSymptoms = Array<HeadacheSymptom>

const respToHeadache = (resp: entity.HeadacheResponse): Headache => {
    const headache: Headache = {
        id: resp.id,
        date: new Date(resp.date),
        severity: resp.severity,
        positions: resp.positions ? resp.positions as HeadachePositions : [],
        types: resp.types ? resp.types as HeadacheTypes : [],
        symptoms: resp.types ? resp.types as HeadacheSymptoms : [],
    }
    return headache
}

export const respToHeadaches = (resp: entity.HeadachesResponse): Array<Headache> => {
    return resp.headaches.map(h => respToHeadache(h))
}