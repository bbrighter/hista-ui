import useHista from "../store"
import { Ingredient } from "../types"

export const useTemplate = (id: number | null | undefined) => {
  const templates = useHista(state => state.templates)
  const ingredients = useHista(state => state.ingredients)
  if (!id) return 
  
  const template = templates[id]    
  return {
    name: template.name,
    items: template.items.map(i => {
      const id = i.ingredientId
      const ingredient = ingredients.find(ing => ing.id == id)!
      return {
        ingredient: {
          id: id,
          isArchived: ingredient.isArchived,
          name: ingredient.name,
        } satisfies Ingredient,
        condition: i.condition,
      }}),
  }

}
