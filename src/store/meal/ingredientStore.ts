import { StateCreator } from "zustand"

import { IngredientStore, NonFunctionProperties, StoreType } from "../store.type"
import { Ingredient } from "./../types"

type State = NonFunctionProperties<IngredientStore>

const initialState = (): State => ({
  ingredients: [],
  isIngredientsLoaded: false,
})

export const createIngredientSlice: StateCreator<
  StoreType,
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
