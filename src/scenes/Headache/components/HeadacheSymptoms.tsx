import { useEffect, useRef, useState } from 'react'

import { validHeadacheSymptoms } from '../../../store/headaches/headaches'
import useHista from '../../../store/store'
import HeadacheInputs, { ValueLabelPair } from './Tags'

export default function HeadacheSymptomsButtons() {
    const isFirstRender = useRef(true);
    const symptoms = useHista(state => state.headache.symptoms)
    const patchSymptoms = useHista(state => state.patchHeadacheSymptoms)

    const [selectedSymptoms, setSelectedSymptoms] = useState(symptoms)


    useEffect(() => {
        setSelectedSymptoms(symptoms)
    }, [symptoms])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (selectedSymptoms != symptoms) {
            patchSymptoms(selectedSymptoms)
        }
    }, [selectedSymptoms])

    const onAdd = (v: ValueLabelPair) => {
        setSelectedSymptoms([...selectedSymptoms, v])
    }

    const onRemove = (v: ValueLabelPair) => {
        setSelectedSymptoms(selectedSymptoms.filter(pos => pos.value !== v.value))
    }


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

