import useHista from '../store'

export const useNonArchivedIngredients = () => {
  const ingredients = useHista(state => state.ingredients)

  return [...ingredients].filter(i => !i.isArchived).sort((a, b) => a.name.localeCompare(b.name))
}
