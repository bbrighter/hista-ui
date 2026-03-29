import { validHeadacheTypes } from "../../../store"
import useHista from "../../../store/store"
import HeadacheInputs, { ValueLabelPair } from "./Tags"

export default function HeadacheTypesButtons() {
  const types = useHista(state => state.headache.types)
  const patchTypes = useHista(state => state.patchHeadacheTypes)

  const onAdd = (v: ValueLabelPair) => patchTypes([...types, v])
  const onRemove = (v: ValueLabelPair) => patchTypes(types.filter(pos => pos.value != v.value))

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
