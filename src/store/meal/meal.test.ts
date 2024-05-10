import { test, expect } from 'vitest'
import { respToMeal } from './meal'
import { meals } from '../../api/generatedApi'

test('Meal', () => {
    const resp: meals.MealResponse = {
        id: 1,
        date: "2024-04-22T17:28:58.419+02:00",
        foods: [],
    }

    const meal = respToMeal(resp)

    expect(meal.id).toBe(1)
    expect(meal.date.getFullYear()).toBe(2024)
})