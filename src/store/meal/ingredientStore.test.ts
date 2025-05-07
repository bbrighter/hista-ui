import { describe, expect, it } from 'vitest'

import useHista from '../store'


describe('mealStore', () => {
    it('getIngredients', async () => {
        expect(useHista.getState().ingredientsAreLoaded).toBeFalsy()
        await useHista.getState().getIngredients()

        expect(useHista.getState().ingredients).toHaveLength(2)
        expect(useHista.getState().ingredients[0].id).toBe(1)
        expect(useHista.getState().ingredients[0].name).toBe('ingredient1')
        expect(useHista.getState().ingredientsAreLoaded).toBeTruthy()
    })
})