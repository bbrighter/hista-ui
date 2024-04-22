import { meals } from "../api/generatedApi"

export interface Meal {
    id?: number
    date: Date
    foods: Food[]
}

interface Food {
    id: number
    ingredient: string
    condition: string
}

export const respToMeal = (resp: meals.MealResponse): Meal => {
    const foods = resp.foods.map(f => (
        { id: f.id, ingredient: f.ingredient.name, condition: f.foodCondition })
    )
    const meal = {
        id: resp.id,
        date: new Date(resp.date),
        foods: foods
    }
    return meal
}