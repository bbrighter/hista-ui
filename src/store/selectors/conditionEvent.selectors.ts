import useHista from "../store"

export const useConditionEvents = () => {
  const events = useHista(state => state.conditionEvents)
  return [...events].sort((a,b) => b.date.getTime() - a.date.getTime())
}