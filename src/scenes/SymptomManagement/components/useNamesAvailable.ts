import { useCallback } from "react"

import useHista from "../../../store/store"

export const useIsSymptomNameAvailable = () =>  {
  const symptoms = useHista(state => state.symptoms)

  return (name: string, catId: number) => {
    const category = symptoms.find(c => c.categoryId === catId)
    if (!category) return false
    return !category.symptoms.some(s => s.name.trim() === name.trim())
  }
}

export const useIsCategoryNameAvailable = () => {
  const symptoms = useHista(state => state.symptoms)
  return useCallback((name: string) => {
    return !symptoms.some(c => c.categoryName.trim() === name.trim())
  }, [symptoms])
}
