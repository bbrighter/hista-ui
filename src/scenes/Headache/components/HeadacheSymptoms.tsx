import { validHeadacheSymptoms } from '../../../store/headaches/headaches'
import useHista from '../../../store/store'
import HeadacheInputs, { ValueLabelPair } from './Tags'

export default function HeadacheSymptomsButtons() {
    const symptoms = useHista(state => state.headache.symptoms)
    const patchSymptoms = useHista(state => state.patchHeadacheSymptoms)

    const onAdd = (v: ValueLabelPair) => patchSymptoms([...symptoms, v])
    const onRemove = (v: ValueLabelPair) => patchSymptoms(symptoms.filter(pos => pos.value !== v.value))

    return (
        <HeadacheInputs
            label="Weitere Symptome"
            values={symptoms}
            options={validHeadacheSymptoms}
            onAdd={onAdd}
            onRemove={onRemove}
        />
    )
}

