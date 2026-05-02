import { useMemo } from "react"

import useHista from "../../../store/store"


export const useConditionsWithSymptoms = () => {
  const conditions = useHista(state => state.conditionEvent.conditions)
  const symptoms = useHista(state => state.symptoms)
  const flatSymptoms = symptoms.flatMap(cat => (
    cat.symptoms.map(s => ({ catId: cat.categoryId, catName: cat.categoryName, symptomId: s.id, symptomName: s.name }))
  ))

  return useMemo(() => conditions.map(c => {
    const symptom = flatSymptoms.find(s => s.symptomId == c.symptomId)
    return { ...c, ...symptom }
  }).sort((a, b) => (b.catId ?? 0) - (a.catId ?? 0))
  , [conditions, flatSymptoms])
}