import { entity } from "../../api/generatedApi"
import { Food, respToFood } from "./food"

export interface Meal {
  id?: number
  date: Date
  freshness: Freshness
  isAlone: boolean
  stressLevel: number
  foods: Food[]
  isLoading: boolean
}

export enum Freshness {
  fresh = 0,
  old = 2,
  sameDay = 1,
}

export const stringToFreshness = (str: number): Freshness => {
  switch (str) {
    case 0:
      return Freshness.fresh
    case 2:
      return Freshness.old
    default:
      return Freshness.sameDay
  }
}

export const respToMeal = (resp: entity.MealResponse): Meal => {
  const foods = resp.foods.map(f => respToFood(f))
  const meal: Meal = {
    id: resp.id,
    date: new Date(resp.date),
    freshness: stringToFreshness(resp.freshness),
    isAlone: resp.isAlone,
    stressLevel: resp.stressLevel,
    foods: foods,
    isLoading: false,
  }
  return meal
}
