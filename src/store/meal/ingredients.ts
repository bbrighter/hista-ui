import { meals } from "../../api/generatedApi"

export interface Ingredient {
    id: number
    name: string
}

export type Ingredients = Array<Ingredient>

export const respToIngredients = (resp: meals.IngredientsResponse): Ingredients => {
    if (!resp.ingredients) return []
    const ingredients = resp.ingredients.map(ing => (
        { id: ing.id, name: ing.name })
    )
    return ingredients
}