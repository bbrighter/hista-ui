import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestStore } from '../../__tests__/storeUtils'
import { entity } from '../../api/generatedApi'
import { mockClient } from '../../__tests__/__mocks__/apiMocks'


describe('mealStore', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })


    it('getIngredients', async () => {
        const mockResp: entity.IngredientsResponse = {
            ingredients: [{ id: 1, name: 'name' }],
        }
        mockClient.api.GetIngredients.mockResolvedValue(mockResp)

        expect(store.getState().ingredientsAreLoaded).toBeFalsy()
        await store.getState().getIngredients()
        expect(store.getState().ingredients).toHaveLength(1)
        expect(store.getState().ingredients[0].id).toBe(1)
        expect(store.getState().ingredients[0].name).toBe('name')
        expect(store.getState().ingredientsAreLoaded).toBeTruthy()
    })
})