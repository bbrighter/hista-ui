import { entity } from "../../api/generatedApi"

type Ingredient = {
  id: number
  name: string
  isArchived: boolean
}

export type Ingredients = Array<Ingredient>

export const respToIngredients = (resp: entity.IngredientsResponse): Ingredients => {
  if (!resp.ingredients) return []
  const ingredients = resp.ingredients.map(ing => (
    { id: ing.id, name: ing.name, isArchived: ing.isArchived }),
  )
  return ingredients
}
