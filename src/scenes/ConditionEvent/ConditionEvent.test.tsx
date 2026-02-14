import { fireEvent, screen, waitFor, within } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import ConditionEvent from './ConditionEvent'

const renderConditionEvent = () => {
  render(
    <MemoryRouter initialEntries={['/condition-events/1']}>
      <Routes>
        <Route path="/condition-events/:id" element={<ConditionEvent />} />
      </Routes>
    </MemoryRouter>,
  )
}

const getSlider = (symptomName: string): HTMLElement => {
  const symptom = screen.getByText(symptomName)
  const listItem = symptom.closest('li')

  const input = within(listItem).getByRole('slider')
  return input
}

const sliderHasColor = (symptomName: string, color: 'Error' | 'Secondary'): boolean => {
  const symptom = screen.getByText(symptomName)
  const listItem = symptom.closest('li')
  const button = listItem.querySelector('.MuiSlider-root')
  return button.className.includes(color)
}

describe('condition event is rendered and can be edited', () => {
  it('Existing symptoms are displayed', async () => {
    renderConditionEvent()

    const input = await waitFor(() => {
      return getSlider('symptom1')
    })
    expect(input.ariaValueNow).toBe('3')
  })

  it('Change severity of symptom', async () => {
    renderConditionEvent()

    const input = await waitFor(() => {
      return getSlider('symptom1')
    })
    expect(input.ariaValueNow).toBe('3')
    expect(sliderHasColor('symptom1', 'Secondary')).toBeTruthy()

    fireEvent.change(input, { target: { value: 5 } })
    expect(input.ariaValueNow).toBe('5')
    expect(sliderHasColor('symptom1', 'Error')).toBeTruthy()
  })

  it('Delete symptom', async () => {
    renderConditionEvent()

    const deleteButton = await screen.findByTitle('Löschen')
    expect(deleteButton).toBeInTheDocument()
    await userEvent.click(deleteButton)
    expect(screen.queryByTitle('Löschen')).not.toBeInTheDocument()
  })

  it('Add symptom', async () => {
    renderConditionEvent()

    const symptomInput = await screen.findByRole('combobox')
    expect(symptomInput).toBeInTheDocument()

    await userEvent.type(symptomInput, 'symp')
    const selectableValue = screen.getByText('symptom2')
    expect(selectableValue).toBeInTheDocument()
    await userEvent.click(selectableValue)

    expect(getSlider('symptom2')).toBeInTheDocument()
  })
})
