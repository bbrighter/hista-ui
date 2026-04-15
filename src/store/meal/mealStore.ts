import { StateCreator } from "zustand"

import { MealStore, NonFunctionProperties, StoreType } from "../store.type"
import { Food,Freshness, Meal, Meals, MetaMeal } from "../types"

type State = NonFunctionProperties<MealStore>

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
  StoreType,
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

  addFood: (food: Food | Array<Food>) => set(state => {
    if (Array.isArray(food)) {
      state.meal.foods = [...state.meal.foods, ...food]
    } else {
      state.meal.foods.unshift(food)
    }
    
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
