import { meals } from "../../api/generatedApi"
import { Food, respToFood } from "./food"

export interface Meal {
    id?: number
    date: Date
    foods: Food[]
}

export const respToMeal = (resp: meals.MealResponse): Meal => {
    const foods = resp.foods.map(f => respToFood(f))
    const meal = {
        id: resp.id,
        date: new Date(resp.date),
        foods: foods
    }
    return meal
}