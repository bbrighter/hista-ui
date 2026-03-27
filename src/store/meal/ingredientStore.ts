import { StateCreator } from "zustand"

import { Ingredient, Ingredients } from "./../types"

interface State {
  ingredients: Ingredients
  isIngredientsLoaded: boolean
}

interface Actions {
  resetIngredients: () => void
  setIngredients: (ingredients: Ingredients) => void
  updateIngredient: (id: number, update: Partial<Ingredient>) => void
  setIsIngredientsLoaded: (loaded: boolean) => void
}

export interface IngredientStore extends State, Actions { }

const initialState = (): State => ({
  ingredients: [],
  isIngredientsLoaded: false,
})

export const createIngredientSlice: StateCreator<
  IngredientStore,
  [["zustand/immer", never]],
  [],
  IngredientStore> = set => ({
  ...initialState(),

  resetIngredients() {
    set(initialState())
  },

  setIngredients: (ingredients) => {
    set(state => {
      state.ingredients = ingredients
    })
  },
  updateIngredient: (id: number, update: Partial<Ingredient>) => {
    set(state => {
      const index = state.ingredients.findIndex(ing => ing.id === id)
      if (index !== -1) {
        state.ingredients[index] = { ...state.ingredients[index], ...update }
      }
    })
  },
  setIsIngredientsLoaded: (loaded: boolean) => {
    set(state => {
      state.isIngredientsLoaded = loaded
    })
  },
})
