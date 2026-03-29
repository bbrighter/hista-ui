import useHista from "../store"

export const useIsSymptomNameAvailable = () => (name: string, catId: number) =>  {
  const symptoms = useHista(state => state.symptoms)
  return !symptoms.find(c => c.categoryId === catId).symptoms.some(s => s.name.trim() === name.trim())
}

export const useIsCategoryNameAvailable = () => (name: string) => {
  const symptoms = useHista(state => state.symptoms)
  return !symptoms.some(c => c.categoryName.trim() === name.trim())
}