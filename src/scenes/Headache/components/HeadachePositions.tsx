
import { useEffect, useRef, useState } from 'react'

import { validHeadachePositions } from '../../../store/headaches/headaches'
import useHista from '../../../store/store'
import HeadacheInputs, { ValueLabelPair } from './Tags'


export default function HeadachePositionsButtons() {
    const isFirstRender = useRef(true);
    const positions = useHista(state => state.headache.positions)
    const patchPositions = useHista(state => state.patchHeadachePositions)

    const [selectedPositions, setSelectedPositions] = useState(positions)


    useEffect(() => {
        setSelectedPositions(positions)
    }, [positions])


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (selectedPositions != positions) {
            patchPositions(selectedPositions)
        }
    }, [selectedPositions])


    const onAdd = (v: ValueLabelPair) => {
        setSelectedPositions([...selectedPositions, v])
    }

    const onRemove = (v: ValueLabelPair) => {
        setSelectedPositions(selectedPositions.filter(pos => pos.value !== v.value))
    }

    return (
        <HeadacheInputs
            label="Wo?"
            options={validHeadachePositions}
            values={positions}
            onAdd={onAdd}
            onRemove={onRemove}
        />
    )
}