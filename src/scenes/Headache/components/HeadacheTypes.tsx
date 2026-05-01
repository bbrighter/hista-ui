import { actions } from "../../../actions"
import { validHeadacheTypes } from "../../../store"
import useHista from "../../../store/store"
import HeadacheInputs, { ValueLabelPair } from "./Tags"

export default function HeadacheTypesButtons() {
  const types = useHista(state => state.headache.types)
  const id = useHista(state => state.headache.id)

  const onAdd = (v: ValueLabelPair) => actions.headaches.patchTypes(id, [...types, v])
  const onRemove = (v: ValueLabelPair) => actions.headaches.patchTypes(id, types.filter(pos => pos.value != v.value))

  return (
    <HeadacheInputs
      label="Art"
      options={validHeadacheTypes}
      values={types}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  )
}
