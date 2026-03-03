import { produce } from "immer"
import { StateCreator } from "zustand"

import { Food,Freshness, Meal, Meals } from "../types"
import { IngredientStore } from "./ingredientStore"

interface State {
  meals: Meals
  mealsAreLoaded: boolean
  meal: Meal
}

interface Actions {
  resetMeals: () => void

  setMeals: (meals: Meals) => void
  setMeal: (meal: Meal) => void
  removeMeal: (id: number) => void
  updateMeal: (partial: Partial<Meal>) => void

  addFood: (food: Food) => void
  removeFood: (id: number) => void
  updateFood: (id: number, partial: Partial<Food>) => void
  //   // Meals
  //   listMeals: () => Promise<void>
  //   postMeal: () => Promise<number | void>
  //   deleteMeal: (id: number) => Promise<void>
  //   updateMeal: (params: entity.PatchMealParams) => Promise<void>
  //   getMeal: (id: number) => Promise<void>

  // Foods
//   postFood: (ingredientName?: string, ingredientId?: number) => Promise<void>
//   deleteFood: (foodId: number) => Promise<void>
//   patchFoodCondition: (foodId: number, newCondition: FoodCondition) => Promise<void>
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

  

  //   // Meals
  //   listMeals: async () => {
  //     if (!get().mealsAreLoaded || get().meals.length == 0) {
  //       const resp = await client.ListMeals()
  //       set(produce((draft: State) => {
  //         draft.meals = respToMetaMeals(resp)
  //         draft.mealsAreLoaded = true
  //       }))
  //     }
  //   },
  //   postMeal: async (): Promise<number | void> => {
  //     const params: entity.PostMealParams = {
  //       date: new Date().toISOString(),
  //     }
  //     const resp = await client.PostMeal(params)
  //     set(produce((draft: State) => {
  //       const newMeal: MetaMeal = {
  //         date: new Date(resp.date),
  //         id: resp.id,
  //       }
  //       draft.meals.unshift(newMeal)
  //     }))
  //     return resp.id
  //   },
  //   deleteMeal: async (id: number): Promise<void> => {
  //     const resp = await client.DeleteMeal(id)
  //     set(produce((draft: State) => {
  //       draft.meals = removeItemById(id, get().meals)
  //     }))
  //     get().setIngredients(respToIngredients(resp))
  //   },

  //   // Meal
  //   updateMeal: async (params: entity.PatchMealParams) => {
  //     const id = get().meal.id
  //     if (!id) return
  //     await client.PatchMeal(id, params)
  //     set(produce((draft: State) => {
  //       if (params.date) {
  //         draft.meal.date = new Date(params.date)
  //       }
  //       if (params.freshness != undefined) {
  //         draft.meal.freshness = stringToFreshness(params.freshness)
  //       }
  //       if (params.isAlone != undefined) {
  //         draft.meal.isAlone = params.isAlone
  //       }
  //       if (params.stressLevel != undefined) {
  //         draft.meal.stressLevel = params.stressLevel
  //       }
  //     }))
  //   },
  //   getMeal: async (id: number) => {
  //     set(produce((draft: State) => {
  //       draft.meal.isLoading = true
  //     }))
  //     const resp = await client.GetMeal(id)
  //     set(produce((draft: State) => {
  //       draft.meal = respToMeal(resp)
  //     }))
  //   },

  //   // Foods
  //   postFood: async (ingredientName?: string, ingredientId?: number) => {
  //     const mealId = get().meal.id
  //     if (!mealId) return
  //     const params: hista.FoodParams = {
  //       ingredientName: ingredientName,
  //       ingredientId: ingredientId,
  //     }
  //     const resp = await client.PostFood(mealId, params)
  //     const food = respToFood(resp.food)
  //     set(produce((draft: State) => {
  //       draft.meal.foods.unshift(food)
  //     }))
  //     get().setIngredients(respToIngredients(resp.ingredients))
  //   },

  //   // Food
  //   deleteFood: async (foodId: number) => {
  //     const resp = await client.DeleteFood(foodId)
  //     get().setIngredients(respToIngredients(resp))
  //     set(produce((draft: State) => {
  //       draft.meal.foods = removeItemById(foodId, get().meal.foods)
  //     }))
  //   },

//   patchFoodCondition: async (foodId: number, newCondition: FoodCondition) => {
//     const params: hista.PatchFoodConditionParams = { condition: newCondition }
//     const foodIndex = get().meal.foods.findIndex(f => f.id == foodId)
//     await client.PatchFoodCondition(foodId, params)
//     set(produce((draft: State) => {
//       draft.meal.foods[foodIndex].condition = newCondition
//     }))
//   },
})

interface Items {
  id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
  return items.filter(it => it.id != id)
}
