import { entity } from '../../api/generatedApi'

export interface Headache {
    id: number
    date: Date
    severity: number
    positions: HeadachePositions
    types: HeadacheTypes
    symptoms: HeadacheSymptoms
    description: string
}

interface ValueLabelPair {
    value: string
    label: string
}


export type HeadachePositions = Array<ValueLabelPair>

export const validHeadachePositions: HeadachePositions = [
    { value: 'left', label: 'Links' },
    { value: 'right', label: 'Rechts' },
    { value: 'top', label: 'Oben' },
    { value: 'back', label: 'Hinterkopf' },
    { value: 'side', label: 'Seite' },
    { value: 'temple', label: 'Schläfe' },
    { value: 'front', label: 'Stirn' },
    { value: 'ear', label: 'Ohr' },
    { value: 'neck', label: 'Nacken' },
    { value: 'eye', label: 'Auge' },
]

export type HeadacheTypes = Array<ValueLabelPair>;

export const validHeadacheTypes: HeadacheTypes = [
    { value: 'pulsating-pounding', label: 'Pulsierend-pochend' },
    { value: 'dull-pressing', label: 'Dumpf-drückend' },
    { value: 'stabbing', label: 'Stechend' },
];



export type HeadacheSymptoms = Array<ValueLabelPair>;

export const validHeadacheSymptoms: HeadacheSymptoms = [
    { value: 'short-term memory', label: 'Kurzzeitgedächtnis' },
    { value: 'tinnitus', label: 'Tinnitus' },
    { value: 'light-sensitive', label: 'Lichtempfindlichkeit' },
    { value: 'noise-sensitive', label: 'Lärmempfindlichkeit' },
    { value: 'odor-sensitive', label: 'Geruchsempfindlichkeit' },
    { value: 'dizziness', label: 'Schwindel' },
    { value: 'lack of concentration', label: 'Konzentrationsstörung' },
    { value: 'tired', label: 'Müdigkeit' },
    { value: 'exhausted', label: 'Erschöpfung' },
    { value: 'physical activity', label: 'Verstärkt durch körperliche Aktivität' },
    { value: 'mind activity', label: 'Verstärkt durch geistige Aktivität' },
    { value: 'nausea', label: 'Übelkeit' },
    { value: 'no physical activity', label: 'Keine körperliche Aktivität' },
];

const respToHeadache = (resp: entity.HeadacheResponse): Headache => {
    const headache: Headache = {
        id: resp.id,
        date: new Date(resp.date),
        severity: resp.severity,
        positions: resp.positions?.map(p => ({ value: p, label: validHeadachePositions.find(v => v.value == p).label || p })) ?? [],
        types: resp.types?.map(t => ({ value: t, label: validHeadacheTypes.find(v => v.value == t).label || t })) ?? [],
        symptoms: resp.symptoms?.map(s => ({ value: s, label: validHeadacheSymptoms.find(v => v.value == s).label || s })) ?? [],
        description: resp.description,
    }
    return headache
}

export const respToHeadaches = (resp: entity.HeadachesResponse): Array<Headache> => {
    return resp.headaches.map(h => respToHeadache(h))
}