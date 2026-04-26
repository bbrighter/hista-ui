import { useMemo } from "react"

import useHista from "../store"

export const useIsSymptomNameAvailable = () => (name: string, catId: number) =>  {
  const symptoms = useHista(state => state.symptoms)
  const category = symptoms.find(c => c.categoryId === catId)
  if (!category) return false
  return !category.symptoms.some(s => s.name.trim() === name.trim())
}

export const useIsCategoryNameAvailable = () => (name: string) => {
  const symptoms = useHista(state => state.symptoms)
  return !symptoms.some(c => c.categoryName.trim() === name.trim())
}

export const useConditionsWithSymptoms = () => {
  const conditions = useHista(state => state.conditionEvent.conditions)
  const symptoms = useHista(state => state.symptoms)
  const flatSymptoms = symptoms.flatMap(cat => (
    cat.symptoms.map(s => ({ catId: cat.categoryId, catName: cat.categoryName, symptomId: s.id, symptomName: s.name }))
  ))

  return useMemo(() => conditions.map(c => {
    const symptom = flatSymptoms.find(s => s.symptomId == c.symptomId) || { catId: 0, catName: "Unbekannt", symptomName: "Unbekannt" }
    return { ...c, ...symptom }
  }).sort((a, b) => b.catId - a.catId)
  , [conditions, symptoms])
}