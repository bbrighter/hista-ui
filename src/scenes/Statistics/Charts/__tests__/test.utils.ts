import { screen, within } from '@testing-library/dom'

export const getIngredientSelect = () => {
  return within(screen.getByTestId('ingredientSelect')).getByRole('combobox')!
}

export const getFilter = () => {
  return screen.getByTestId('severityFilter')!
}
