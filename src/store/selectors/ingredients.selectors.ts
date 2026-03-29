import useHista from "../store"
import { Ingredient } from "../types"

export const useNonArchivedIngredients = () => {
  return useIngredients("hideArchived")
}

export const useAllIngredients = () => {
  return useIngredients()
}

const useIngredients = (hideArchived?: "hideArchived") => {
  const ingredients = useHista(state => state.ingredients)
  const filterFn = (i: Ingredient, hideArchived?: "hideArchived") => {
    if (hideArchived == "hideArchived") {
      return !i.isArchived
    }
    return true
  }

  return [...ingredients].filter(i => filterFn(i, hideArchived)).sort((a, b) => a.name.localeCompare(b.name))
}