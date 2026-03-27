import { StateCreator } from "zustand"

import { Food,Freshness, Meal, Meals, MetaMeal } from "../types"
import { IngredientStore } from "./ingredientStore"

interface State {
  meals: Meals
  meal: Meal
  isMealsLoaded: boolean
}

interface Actions {
  resetMeals: () => void
  setIsMealsLoaded: (loaded: boolean) => void

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
  meal: {
    date: new Date(),
    freshness: Freshness.fresh,
    isAlone: true,
    stressLevel: 0,
    foods: [],
    isLoading: true,
  },
  isMealsLoaded: false,
}

export const createMealSlice: StateCreator<
    MealStore & IngredientStore,
    [["zustand/immer", never]],
    [],
    MealStore> = (set) => ({
  ...initialState,

  resetMeals: () => set(initialState),
  setIsMealsLoaded: (loaded: boolean) => set(state => {
    state.isMealsLoaded = loaded
  }),

  setMeals: (meals: Meals) => set(state => {
    state.meals = meals
  }),

  setMetaMeal: (id: number, partial: Partial<MetaMeal>) => set(state => {
    const idx = state.meals.findIndex(m => m.id === id)
    if (idx !== -1) Object.assign(state.meals[idx], partial)
  }),

  setMeal: (meal: Meal) => set(state => {
    state.meal = meal
  }),

  removeMeal: (id: number) => set(state => {
    state.meals = removeItemById(id, state.meals)
  }),


  updateMeal: (partial: Partial<Meal>) => set(state => {
    Object.assign(state.meal, partial)
  }),

  addFood: (food: Food) => set(state => {
    state.meal.foods.unshift(food)
  }),

  removeFood: (id: number) => set(state => {
    state.meal.foods = removeItemById(id, state.meal.foods)
  }),

  updateFood: (id: number, partial: Partial<Food>) => set(state => {
    const idx = state.meal.foods.findIndex(f => f.id === id)
    if (idx !== -1) Object.assign(state.meal.foods[idx], partial)
  }),
})

interface Items {
  id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
  return items.filter(it => it.id != id)
}
