import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { Ingredients } from './../types'

interface State {
  ingredients: Ingredients
  ingredientsAreLoaded: boolean
}

interface Actions {
  setIngredientsAreLoaded: () => void
  setIngredients: (ingredients: Ingredients) => void
}

export interface IngredientStore extends State, Actions { }

const initialState: State = {
  ingredients: [],
  ingredientsAreLoaded: false,
}

export const createIngredientSlice: StateCreator<
  IngredientStore,
  [],
  [],
  IngredientStore> = set => ({
  ...initialState,

  setIngredientsAreLoaded: () => {
    set(produce((draft: State) => {
      draft.ingredientsAreLoaded = true
    },
    ))
  },
  setIngredients: (ingredients) => {
    set(produce((draft: State) => {
      draft.ingredients = ingredients
    }))
  },
})
