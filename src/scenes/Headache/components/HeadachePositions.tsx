import { validHeadachePositions } from '../../../store/headaches/headaches'
import useHista from '../../../store/store'
import HeadacheInputs, { ValueLabelPair } from './Tags'

export default function HeadachePositionsButtons() {
    const positions = useHista(state => state.headache.positions)
    const patchPositions = useHista(state => state.patchHeadachePositions)

    const onAdd = (v: ValueLabelPair) => patchPositions([...positions, v])

    const onRemove = (v: ValueLabelPair) => patchPositions(positions.filter(pos => pos.value != v.value))

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
