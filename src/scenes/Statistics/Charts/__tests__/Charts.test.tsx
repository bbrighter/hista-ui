import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Charts } from '../Charts'
import { getFilter, getIngredientSelect } from './test.utils'

describe('Charts', () => {
    it('render', async () => {
        render(<Charts />)

        expect(await screen.findAllByLabelText('Von')).toHaveLength(2)
        expect(await screen.findAllByLabelText('Bis')).toHaveLength(2)

        const ingredientSelect = getIngredientSelect()
        expect(ingredientSelect).toBeInTheDocument()
        expect(within(ingredientSelect).getByText('-')).toBeInTheDocument()

        const filter = getFilter()
        expect(filter).toBeInTheDocument()
        const sliderValues = within(filter).queryAllByRole('slider')
        expect(sliderValues).toHaveLength(2)
        expect(sliderValues[0].ariaValueNow).toBe('1')
        expect(sliderValues[1].ariaValueNow).toBe('5')
    })

    it('select ingredient', async () => {
        render(<Charts />)

        const ingredientSelect = await waitFor(() => getIngredientSelect())
        expect(ingredientSelect).toBeInTheDocument()

        await userEvent.click(ingredientSelect)
        const option1 = await screen.findByRole('option', { name: 'ingredient1' })
        await userEvent.click(option1)
        expect(screen.getByText('ingredient1')).toBeInTheDocument()
        expect(screen.queryByText('-')).not.toBeInTheDocument()
    })
})
