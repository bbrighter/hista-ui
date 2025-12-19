import { expect, test } from 'vitest'

import { entity } from '../../api/generatedApi'
import { Freshness, respToMeal } from './meal'

test('Meal', () => {
    const resp: entity.MealResponse = {
        id: 1,
        date: '2024-04-22T17:28:58.419+02:00',
        freshness: 0,
        isAlone: true,
        stressLevel: 2,
        foods: [],
    }

    const meal = respToMeal(resp)

    expect(meal.id).toBe(1)
    expect(meal.date.getFullYear()).toBe(2024)
    expect(meal.freshness).toBe(Freshness.fresh)
    expect(meal.isAlone).toBeTruthy()
    expect(meal.stressLevel).toBe(2)
})
