import { FoodCondition, Ingredient } from "../../../../store"

export type DraftTemplateRow = {
  ingredient: Ingredient | null
  condition: FoodCondition
}

export type DraftTemplate = Array<DraftTemplateRow>