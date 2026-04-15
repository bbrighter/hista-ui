import { entity } from "../../api/generatedApi"

export interface Food {
  id: number
  ingredientName: string
  ingredientId: number
  condition: FoodCondition
  amount?: number
}

export type FoodCondition = "raw" | "cooked"

export const respToFoodCondition = (resp: entity.FoodCondition): FoodCondition => {
  return resp == "raw" ? "raw" : "cooked"
}

export const respToFood = (resp: entity.FoodResponse): Food => {
  return {
    id: resp.id,
    ingredientName: resp.ingredient.name,
    ingredientId: resp.ingredient.id,
    condition: respToFoodCondition(resp.foodCondition),
    amount: resp.amount,
  }
}
