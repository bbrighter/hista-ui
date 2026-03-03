import { entity } from "../../api/generatedApi"

export interface Food {
  id: number
  ingredientName: string
  ingredientId: number
  condition: FoodCondition
  amount?: number
}

export type FoodCondition = "raw" | "cooked"

export const respToFood = (resp: entity.FoodResponse): Food => {
  const condition: FoodCondition = resp.foodCondition == "raw" ? "raw" : "cooked"
  return {
    id: resp.id,
    ingredientName: resp.ingredient.name,
    ingredientId: resp.ingredient.id,
    condition: condition,
    amount: resp.amount,
  }
}
