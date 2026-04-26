import { services, validHeadacheSymptoms } from "../../../store"
import useHista from "../../../store/store"
import HeadacheInputs, { ValueLabelPair } from "./Tags"

export default function HeadacheSymptomsButtons() {
  const symptoms = useHista(state => state.headache.symptoms)
  const id = useHista(state => state.headache.id)

  const onAdd = (v: ValueLabelPair) => services.headaches.patchSymptoms(id, [...symptoms, v])
  const onRemove = (v: ValueLabelPair) => services.headaches.patchSymptoms(id, symptoms.filter(pos => pos.value !== v.value))

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
