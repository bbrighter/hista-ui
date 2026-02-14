import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import useHista from '../../store/store'
import Meal from './Meal'

describe('test meals list', () => {
  const findSliderComponent = async (lbl: string, expectedColor: 'Primary' | 'Warning' | 'Error') => {
    const label = await screen.findByText(lbl)
    const box = label.closest('div')
    expect(box).toBeInTheDocument()

    const thumb = box!.querySelector('.MuiSlider-thumb')
    const svg = box!.querySelector('.MuiSvgIcon-root')

    const colorRegex = new RegExp(`${expectedColor}`)
    expect(thumb.getAttribute('class')).toMatch(colorRegex)
    expect(svg.getAttribute('class')).toMatch(colorRegex)
  }

  const findIngredientRow = async (name: string): Promise<HTMLElement> => {
    const ingredientLabel = await screen.findByText(name)
    const listItem = ingredientLabel.closest('li')
    return listItem
  }

  const isButtonPressed = (options: { title?: string, text?: string, parent?: HTMLElement }) => {
    const parent = options.parent ? within(options.parent) : screen
    const button = options.title ? parent.getByTitle(options.title) : parent.getByText(options.text)
    return button.getAttribute('aria-pressed') == 'true'
  }

  it('everything is rendered', async () => {
    render(<MemoryRouter><Meal /></MemoryRouter>)

    expect(await screen.findByDisplayValue('01.01.2024 01:00')).toBeInTheDocument()

    expect(isButtonPressed({ title: 'Alleine' })).toBeTruthy()
    expect(isButtonPressed({ title: 'Zusammen' })).toBeFalsy()

    await findSliderComponent('Stress', 'Primary')
    await findSliderComponent('Frische', 'Error')

    // expect(screen.getByPlaceholderText('Zutaten')).toBeInTheDocument()

    const ingredient1Row = await findIngredientRow('ingredient1')
    expect(ingredient1Row).toBeInTheDocument()
    expect(isButtonPressed({ text: 'Roh', parent: ingredient1Row })).toBeTruthy()
    expect(isButtonPressed({ text: 'Gar', parent: ingredient1Row })).toBeFalsy()

    const ingredient2Row = await findIngredientRow('ingredient2')
    expect(ingredient2Row).toBeInTheDocument()
    expect(isButtonPressed({ text: 'Roh', parent: ingredient2Row })).toBeFalsy()
    expect(isButtonPressed({ text: 'Gar', parent: ingredient2Row })).toBeTruthy()

    expect(screen.queryAllByTitle('Löschen')).toHaveLength(2)
  })

  it('deleting food is possible', async () => {
    render(<MemoryRouter><Meal /></MemoryRouter>)

    const ingredient1Row = await findIngredientRow('ingredient1')
    const deleteButton = within(ingredient1Row)!.getByTitle('Löschen')
    await userEvent.click(deleteButton)

    expect(screen.queryAllByTitle('Löschen')).toHaveLength(1)
    expect(screen.queryByText('ingredient1')).not.toBeInTheDocument()
  })

  it('toggling raw/cooked', async () => {
    render(<MemoryRouter><Meal /></MemoryRouter>)

    const ingredient1Row = await findIngredientRow('ingredient1')
    expect(isButtonPressed({ text: 'Roh', parent: ingredient1Row })).toBeTruthy()
    expect(isButtonPressed({ text: 'Gar', parent: ingredient1Row })).toBeFalsy()

    // Set cooked
    const cookedButton = within(ingredient1Row)!.getByText('Gar')
    await userEvent.click(cookedButton)
    expect(isButtonPressed({ text: 'Roh', parent: ingredient1Row })).toBeFalsy()
    expect(isButtonPressed({ text: 'Gar', parent: ingredient1Row })).toBeTruthy()
    expect(cookedButton).toBeDisabled()

    // Set raw
    const rawButton = within(ingredient1Row)!.getByText('Roh')
    await userEvent.click(rawButton)
    expect(isButtonPressed({ text: 'Roh', parent: ingredient1Row })).toBeTruthy()
    expect(isButtonPressed({ text: 'Gar', parent: ingredient1Row })).toBeFalsy()
    expect(rawButton).toBeDisabled()
  })

  it('toggling alone/together', async () => {
    render(<MemoryRouter><Meal /></MemoryRouter>)

    await waitFor(() => {
      expect(isButtonPressed({ title: 'Alleine' })).toBeTruthy()
      expect(isButtonPressed({ title: 'Zusammen' })).toBeFalsy()
    })

    // Click together
    const togetherButton = screen.getByTitle('Zusammen')
    await userEvent.click(togetherButton)

    expect(isButtonPressed({ title: 'Alleine' })).toBeFalsy()
    expect(isButtonPressed({ title: 'Zusammen' })).toBeTruthy()

    // Click alone
    const aloneButton = screen.getByTitle('Alleine')
    await userEvent.click(aloneButton)

    expect(isButtonPressed({ title: 'Alleine' })).toBeTruthy()
    expect(isButtonPressed({ title: 'Zusammen' })).toBeFalsy()
  })

  it('stress slider', { skip: true }, async () => {

  })

  it('freshness slider', { skip: true }, async () => {

  })

  it('date changes', { skip: true }, async () => {

  })

  it('add food with new ingredient', async () => {
    render(<MemoryRouter><Meal /></MemoryRouter>)

    const ingredientInput = await screen.findByLabelText('Zutaten')
    expect(ingredientInput).toBeInTheDocument()

    await userEvent.type(ingredientInput, 'new ingredient {enter}')
    await screen.findByText('new ingredient')

    await waitFor(() => {
      const ingredients = useHista.getState().ingredients
      expect(ingredients).toHaveLength(3)
    })
  })

  it('add food with existing ingredient', async () => {
    render(<MemoryRouter><Meal /></MemoryRouter>)

    const ingredientInput = await screen.findByLabelText('Zutaten')
    expect(ingredientInput).toBeInTheDocument()

    await userEvent.type(ingredientInput, 'ingredient2')
    await userEvent.keyboard('{ArrowDown}{Enter}')

    await waitFor(() => {
      expect(screen.queryAllByText('ingredient2')).toHaveLength(2)
      const ingredients = useHista.getState().ingredients
      expect(ingredients).toHaveLength(2)
    })
  })
})
