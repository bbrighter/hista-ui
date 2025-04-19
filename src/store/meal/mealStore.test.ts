import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestStore } from '../../__tests__/storeUtils'
import { api, entity } from '../../api/generatedApi'
import { mockClient } from '../../__tests__/__mocks__/apiMocks'
import { Meals } from './meals'
import { Meal } from './meal'



describe('mealStore', () => {
    const testMeal: Meal = { id: 1, date: new Date(), foods: [], freshness: 1, isAlone: true, stressLevel: 3, isLoading: false }
    const testMeals: Meals = [{ id: 1, date: new Date() }]

    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })


    it('getMeals', async () => {
        const mockResp: entity.MealsResponse = {
            meals: [{ date: '2024-02-01T00:00:00Z', id: 1 }],
        }
        mockClient.api.GetMeals.mockResolvedValue(mockResp)

        expect(store.getState().mealsAreLoaded).toBeFalsy()
        await store.getState().getMeals()
        expect(store.getState().meals).toHaveLength(1)
        expect(store.getState().mealsAreLoaded).toBeTruthy()
    })

    it('postMeal', async () => {
        const mockResp: entity.MealResponse = {
            id: 1,
            date: '2024-02-01T00:00:00Z',
            foods: [],
            stressLevel: 3,
            freshness: 1,
            isAlone: true,
        }
        mockClient.api.PostMeal.mockResolvedValue(mockResp)

        const id = await store.getState().postMeal()
        expect(id).toBe(1)
        expect(store.getState().meals).toHaveLength(1)
    })

    it('deleteMeal', async () => {
        store.setState({ ...store.getState(), meals: testMeals })
        expect(store.getState().meals).toHaveLength(1)

        const mockResp: entity.IngredientsResponse = {
            ingredients: [{ id: 1, name: 'name' }],
        }
        mockClient.api.DeleteMeal.mockResolvedValue(mockResp)

        await store.getState().deleteMeal(1)
        expect(store.getState().meals).toHaveLength(0)
        expect(store.getState().ingredients).toHaveLength(1)
        const ingredient = store.getState().ingredients[0]
        expect(ingredient.id).toBe(1)
        expect(ingredient.name).toBe('name')
    })

    it('updateMeal', async () => {
        store.setState({ ...store.getState(), meal: testMeal })
        mockClient.api.PatchMeal.mockResolvedValue(undefined)

        // Update single values
        await store.getState().updateMeal({ date: '2024-02-01T00:00:00Z' })
        expect(store.getState().meal.date).toEqual(new Date('2024-02-01T00:00:00Z'))
        await store.getState().updateMeal({ freshness: 2 })
        expect(store.getState().meal.freshness).toEqual(2)
        await store.getState().updateMeal({ isAlone: false })
        expect(store.getState().meal.isAlone).toBeFalsy()
        await store.getState().updateMeal({ stressLevel: 4 })
        expect(store.getState().meal.stressLevel).toEqual(4)

        // Update all values
        await store.getState().updateMeal({
            date: '2024-01-01T00:00:00Z',
            freshness: 1,
            isAlone: true,
            stressLevel: 1,
        })
        expect(store.getState().meal.date).toEqual(new Date('2024-01-01T00:00:00Z'))
        expect(store.getState().meal.freshness).toEqual(1)
        expect(store.getState().meal.isAlone).toBeTruthy()
        expect(store.getState().meal.stressLevel).toEqual(1)

        // Handle 0 values
        await store.getState().updateMeal({ freshness: 0 })
        expect(store.getState().meal.freshness).toEqual(0)
        await store.getState().updateMeal({ stressLevel: 0 })
        expect(store.getState().meal.stressLevel).toEqual(0)
    })

    it('getMeal', async () => {
        const mockResponse: entity.MealResponse = {
            id: 1,
            date: '2024-02-01T00:00:00Z',
            foods: [{ id: 1, ingredient: { name: 'name', id: 10 }, foodCondition: 'raw' }],
            stressLevel: 3,
            freshness: 1,
            isAlone: true,
        }
        mockClient.api.GetMeal.mockResolvedValue(mockResponse)

        await store.getState().getMeal(1)

        const meal = store.getState().meal
        expect(meal).toBeDefined()
        expect(meal.id).toStrictEqual(1)
        expect(meal.date).toStrictEqual(new Date('2024-02-01T00:00:00Z'))
        expect(meal.stressLevel).toStrictEqual(3)
        expect(meal.freshness).toStrictEqual(1)
        expect(meal.isAlone).toBeTruthy()
        expect(meal.foods).toHaveLength(1)
        expect(meal.foods[0].id).toStrictEqual(1)
        expect(meal.foods[0].condition).toStrictEqual('raw')
        expect(meal.foods[0].ingredientId).toStrictEqual(10)
        expect(meal.foods[0].ingredientName).toStrictEqual('name')
    })

    it('postFood', async () => {
        store.setState({ ...store.getState(), meal: testMeal })
        const mockResp: api.PostFoodResponse = {
            food: { id: 1, ingredient: { name: 'name', id: 10 }, foodCondition: 'cooked' },
            ingredients: { ingredients: [{ name: 'name', id: 10 }, { name: 'old', id: 9 }] },
        }
        mockClient.api.PostFood.mockResolvedValue(mockResp)

        await store.getState().postFood('name', 10)
        expect(store.getState().meal.foods).toHaveLength(1)
        expect(store.getState().meal.foods[0].id).toStrictEqual(1)
        expect(store.getState().meal.foods[0].ingredientId).toStrictEqual(10)
        expect(store.getState().meal.foods[0].condition).toStrictEqual('cooked')

        expect(store.getState().ingredients).toHaveLength(2)
        expect(store.getState().ingredients.find(i => i.id === 10)).toBeDefined()
        expect(store.getState().ingredients.find(i => i.id === 9)).toBeDefined()
    })


    it('deleteFood', async () => {
        store.setState({ ...store.getState(), meal: testMeal })
        const mockResp: entity.IngredientsResponse = {
            ingredients: [{ name: 'name', id: 10 }],
        }
        mockClient.api.DeleteFood.mockResolvedValue(mockResp)

        await store.getState().deleteFood(1)
        expect(store.getState().meal.foods).toHaveLength(0)
        expect(store.getState().ingredients).toHaveLength(1)
        expect(store.getState().ingredients[0].id).toBe(10)
    })

    it('patchFoodCondition', async () => {
        const tMeal: Meal = {
            ...testMeal, foods: [{
                id: 1,
                ingredientId: 10,
                ingredientName: 'name',
                condition: 'raw',
            }],
        }

        store.setState({ ...store.getState(), meal: tMeal })
        mockClient.api.PatchFoodCondition.mockResolvedValue(undefined)

        await store.getState().patchFoodCondition(1, 'cooked')
        expect(store.getState().meal.foods[0].condition).toBe('cooked')

        // Patching non-existing food doesn't change the state
        await store.getState().patchFoodCondition(100, 'raw')
        expect(store.getState().meal.foods[0].condition).toBe('cooked')
    })
})