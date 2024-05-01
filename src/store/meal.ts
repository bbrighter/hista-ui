import { meals } from "../api/generatedApi"

export interface Meal {
    id?: number
    date: Date
    foods: Food[]
}

interface Food {
    id: number
    ingredient: string
    condition: FoodCondition
}

export type FoodCondition = 'raw' | 'cooked'

export const respToMeal = (resp: meals.MealResponse): Meal => {
    const foods = resp.foods.map(f => {
        const condition: FoodCondition = f.foodCondition == 'raw' ? 'raw' : 'cooked'
        return { id: f.id, ingredient: f.ingredient.name, condition: condition }
    }
    )
    const meal = {
        id: resp.id,
        date: new Date(resp.date),
        foods: foods
    }
    return meal
}