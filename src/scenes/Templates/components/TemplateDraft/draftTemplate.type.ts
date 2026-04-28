import { FoodCondition, Ingredient } from "../../../../store"

type DraftTemplateRow = {
  ingredient: Ingredient | null
  condition: FoodCondition
}

export type DraftTemplate = Array<DraftTemplateRow>