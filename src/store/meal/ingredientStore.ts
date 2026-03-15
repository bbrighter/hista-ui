import { produce } from "immer"
import { StateCreator } from "zustand"

import { Ingredient, Ingredients } from "./../types"

interface State {
  ingredients: Ingredients
  ingredientsAreLoaded: boolean
}

interface Actions {
  setIngredientsAreLoaded: () => void
  setIngredients: (ingredients: Ingredients) => void
  updateIngredient: (id: number, update: Partial<Ingredient>) => void
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
  updateIngredient: (id: number, update: Partial<Ingredient>) => {
    set(produce((draft: State) => {
      const index = draft.ingredients.findIndex(ing => ing.id === id)
      if (index !== -1) {
        draft.ingredients[index] = { ...draft.ingredients[index], ...update }
      }
    }))
  },
})
