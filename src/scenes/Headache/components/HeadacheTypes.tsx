
import useHista from '../../../store/store'
import { validHeadacheTypes } from '../../../store/headaches/headaches'
import { useEffect, useRef, useState } from 'react'
import HeadacheInputs, { ValueLabelPair } from './Tags'

export default function HeadacheTypesButtons() {
    const isFirstRender = useRef(true);
    const types = useHista(state => state.headache.types)
    const patchTypes = useHista(state => state.patchHeadacheTypes)


    const [selectTypes, setSelectedTypes] = useState(types)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setSelectedTypes(types)
    }, [types])



    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (selectTypes != types) {
            setLoading(true)
            patchTypes(selectTypes).finally(() => setLoading(false))
        }
    }, [selectTypes])

    const onAdd = (v: ValueLabelPair) => {
        setSelectedTypes([...selectTypes, v])
    }

    const onRemove = (v: ValueLabelPair) => {
        setSelectedTypes(selectTypes.filter(pos => pos.value !== v.value))
    }


    return (
        <HeadacheInputs
            label="Art"
            options={validHeadacheTypes}
            values={types}
            onAdd={onAdd}
            onRemove={onRemove}
            loading={loading}
        />
    )
}
