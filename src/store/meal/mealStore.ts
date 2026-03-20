import { produce } from "immer"
import { StateCreator } from "zustand"

import { Food,Freshness, Meal, Meals, MetaMeal } from "../types"
import { IngredientStore } from "./ingredientStore"

interface State {
  meals: Meals
  mealsAreLoaded: boolean
  meal: Meal
}

interface Actions {
  resetMeals: () => void

  setMeals: (meals: Meals) => void
  setMetaMeal: (id: number, meal: Partial<MetaMeal>) => void
  setMeal: (meal: Meal) => void
  removeMeal: (id: number) => void
  updateMeal: (partial: Partial<Meal>) => void

  addFood: (food: Food) => void
  removeFood: (id: number) => void
  updateFood: (id: number, partial: Partial<Food>) => void
}

export interface MealStore extends State, Actions { }

const initialState: State = {
  meals: [],
  mealsAreLoaded: false,
  meal: {
    date: new Date(),
    freshness: Freshness.fresh,
    isAlone: true,
    stressLevel: 0,
    foods: [],
    isLoading: true,
  },
}

export const createMealSlice: StateCreator<
    MealStore & IngredientStore,
    [],
    [],
    MealStore> = (set) => ({
  ...initialState,

  resetMeals: () => set(initialState),

  setMeals: (meals: Meals) =>
    set(produce((draft: State) => {
      draft.meals = meals
      draft.mealsAreLoaded = true
    })),

  setMetaMeal: (id: number, partial: Partial<MetaMeal>) => {
    set(produce((draft: State) => {
      const idx = draft.meals.findIndex(m => m.id === id)
      if (idx !== -1) Object.assign(draft.meals[idx], partial)
    }))

  },

  setMeal: (meal: Meal) =>
    set(produce((draft: State) => {
      draft.meal = meal
    })),

  removeMeal: (id: number) =>
    set(produce((draft: State) => {
      draft.meals = removeItemById(id, draft.meals)
    })),


  updateMeal: (partial: Partial<Meal>) =>
    set(produce((draft: State) => {
      Object.assign(draft.meal, partial)
    })),

  addFood: (food: Food) =>
    set(produce((draft: State) => {
      draft.meal.foods.unshift(food)
    })),

  removeFood: (id: number) =>
    set(produce((draft: State) => {
      draft.meal.foods = removeItemById(id, draft.meal.foods)
    })),

  updateFood: (id: number, partial: Partial<Food>) =>
    set(produce((draft: State) => {
      const idx = draft.meal.foods.findIndex(f => f.id === id)
      if (idx !== -1) Object.assign(draft.meal.foods[idx], partial)
    })),
})

interface Items {
  id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
  return items.filter(it => it.id != id)
}
