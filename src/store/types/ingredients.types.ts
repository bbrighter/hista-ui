import { entity } from "../../api/generatedApi"

export type Ingredient = {
  id: number
  name: string
  isArchived: boolean
  nutrition?: Nutrition
}

export type Nutrition = {
  protein: number
  fat: number
  carbohydrate: number
  fiber: number
}

export type Ingredients = Array<Ingredient>

export const respToIngredients = (resp: entity.IngredientsResponse): Ingredients => {
  if (!resp.ingredients) return []
  const ingredients = resp.ingredients.map(ing =>  {
    return ({ 
      id: ing.id, 
      name: ing.name, 
      isArchived: ing.isArchived,
      ...(ing.nutrition && {
        nutrition: {
          protein: ing.nutrition.protein,
          fat: ing.nutrition.fat,
          carbohydrate: ing.nutrition.carbohydrate,
          fiber: ing.nutrition.fiber,
        } }),
    }) satisfies Ingredient },
  )
  return ingredients
}
