import { entity } from "../../api/generatedApi"
import { FoodCondition, respToFoodCondition } from "./food.types"


export type Templates = Record<number, Template>

export type Template = {
  name: string
  items: Array<TemplateItem>
}

export type TemplateItem = {
  ingredientId: number
  condition: FoodCondition
}

export const repoToTemplates = (resp: entity.TemplateListResponse): Templates => {
  return Object.fromEntries(
    resp.templates.map(t => [t.id, { name: t.name, items: t.items.map(i => (itemRespToItem(i))) }]),
  )
}

const itemRespToItem = (resp: entity.TemplateItemResponse): TemplateItem => {
  return { condition: respToFoodCondition(resp.condition), ingredientId: resp.ingredientId }
}