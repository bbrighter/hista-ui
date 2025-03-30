import useHista from '../../../store/store'
import { validHeadacheSymptoms } from '../../../store/headaches/headaches'
import { useEffect, useRef, useState } from 'react'
import HeadacheInputs, { ValueLabelPair } from './Tags'

export default function HeadacheSymptomsButtons() {
    const isFirstRender = useRef(true);
    const symptoms = useHista(state => state.headache.symptoms)
    const patchSymptoms = useHista(state => state.patchHeadacheSymptoms)

    const [selectedSymptoms, setSelectedSymptoms] = useState(symptoms)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setSelectedSymptoms(symptoms)
    }, [symptoms])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (selectedSymptoms != symptoms) {
            setLoading(true)
            patchSymptoms(selectedSymptoms).finally(() => setLoading(false))
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
            loading={loading}
            onAdd={onAdd}
            onRemove={onRemove}
        />
    )
}

