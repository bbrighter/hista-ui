import { StateCreator } from "zustand"
import { client } from "../../api/api"
import { produce } from "immer"
import { Meals, MetaMeal, respToMetaMeals } from "./meals"
import { Freshness, Meal, respToMeal, stringToFreshness } from "./meal"
import { Ingredients, respToIngredients } from "./ingredients"
import { SymptomStore } from "../symptom/symptomStore"
import { AuthStore } from "../auth/authStore"
import { ErrorStore } from "../error/errorStore"
import { FoodCondition, respToFood } from "./food"
import { api, entity } from "../../api/generatedApi"

interface State {
    meals: Meals
    mealsAreLoaded: boolean
    meal: Meal
    ingredients: Ingredients
    ingredientsAreLoaded: boolean
}

interface Actions {
    // Meals
    getMeals: () => Promise<void>
    postMeal: () => Promise<number | void>
    deleteMeal: (id: number) => Promise<void>

    // Meal
    setMealDate: (dateString: string) => Promise<void>
    updateMeal: (params: entity.MealParams) => Promise<void>
    getMeal: (id: number) => Promise<void>

    // Ingredients
    getIngredients: () => Promise<void>

    // Foods
    postFood: (ingredientName?: string, ingredientId?: number) => Promise<void>

    // Food
    deleteFood: (foodId: number) => Promise<void>
    patchFoodCondition: (foodId: number, newCondition: FoodCondition) => Promise<void>
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
    ingredients: [],
    ingredientsAreLoaded: false
}

export const createMealSlice: StateCreator<
    AuthStore & ErrorStore & MealStore & SymptomStore,
    [],
    [],
    MealStore> = ((set, get) => ({
        ...initialState,

        // Meals
        getMeals: async () => {
            if (!get().mealsAreLoaded || get().meals.length == 0) {
                try {
                    const resp = await client.api.GetMeals()
                    set(produce((draft: State) => {
                        draft.meals = respToMetaMeals(resp)
                        draft.mealsAreLoaded = true
                    }))
                } catch (error) {
                    get().setError(error)
                }
            }

        },
        postMeal: async (): Promise<number | void> => {
            try {
                const params: entity.MealParams = {
                    date: new Date().toISOString()
                }
                const resp = await client.api.PostMeal(params)
                set(produce((draft: State) => {
                    const newMeal: MetaMeal = {
                        date: new Date(resp.date),
                        id: resp.id,
                    }
                    draft.meals.unshift(newMeal)
                }))
                return resp.id
            } catch (error) {
                get().setError(error)
            }
        },
        deleteMeal: async (id: number): Promise<void> => {
            try {
                const resp = await client.api.DeleteMeal(id)
                set(produce((draft: State) => {
                    draft.meals = removeItemById(id, get().meals)
                    draft.ingredients = respToIngredients(resp)
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        // Meal
        setMealDate: async (dateString: string) => {
            const params: entity.MealParams = { date: dateString }
            const id = get().meal.id
            try {
                if (!id) return
                await client.api.PatchMeal(id, params)
                const date = new Date(dateString)
                set(produce((draft: State) => {
                    draft.meal.date = date
                }))
            } catch (error) {
                get().setError(error)
            }

        },
        updateMeal: async (params: entity.MealParams) => {
            const id = get().meal.id
            if (!id) return
            try {
                await client.api.PatchMeal(id, params)
                set(produce((draft: State) => {
                    if (params.date) {
                        draft.meal.date = new Date(params.date)
                    }
                    if (params.freshness) {
                        draft.meal.freshness = stringToFreshness(params.freshness)
                    }
                    if (params.isAlone != undefined) {
                        draft.meal.isAlone = params.isAlone
                    }
                    if (params.stressLevel) {
                        draft.meal.stressLevel = params.stressLevel
                    }
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        getMeal: async (id: number) => {
            try {
                set(produce((draft: State) => {
                    draft.meal.isLoading = true
                }))
                const resp = await client.api.GetMeal(id)
                set(produce((draft: State) => {
                    draft.meal = respToMeal(resp)
                }))
            } catch (error) {
                get().setError(error)
            }
        },


        // Ingredients
        getIngredients: async () => {
            if (!get().ingredientsAreLoaded || get().ingredients.length == 0) {
                try {
                    const resp = await client.api.GetIngredients()
                    set(produce((draft: State) => {
                        draft.ingredients = respToIngredients(resp)
                        draft.ingredientsAreLoaded = true
                    }))
                } catch (error) {
                    get().setError(error)
                }
            }
        },

        // Foods
        postFood: async (ingredientName?: string, ingredientId?: number) => {
            const mealId = get().meal.id
            const condition = "cooked"
            if (!mealId) return
            try {
                const params: api.FoodParams = {
                    condition: condition,
                    ingredientName: ingredientName,
                    ingredientId: ingredientId
                }
                const resp = await client.api.PostFood(mealId, params)
                const food = respToFood(resp.food)
                const ingredients = respToIngredients(resp.ingredients)
                set(produce((draft: State) => {
                    draft.meal.foods.unshift(food)
                    draft.ingredients = ingredients
                }))
            } catch (error) {
                get().setError(error)
            }

        },

        // Food
        deleteFood: async (foodId: number) => {
            try {
                const resp = await client.api.DeleteFood(foodId)
                const ingredients = respToIngredients(resp)
                set(produce((draft: State) => {
                    draft.meal.foods = removeItemById(foodId, get().meal.foods)
                    draft.ingredients = ingredients
                }))
            } catch (error) {
                get().setError(error)
            }
        },

        patchFoodCondition: async (foodId: number, newCondition: FoodCondition) => {
            const params: api.FoodConditionParams = { Condition: newCondition }
            const foodIndex = get().meal.foods.findIndex(f => f.id == foodId)
            try {
                await client.api.PatchFoodCondition(foodId, params)
                set(produce((draft: State) => {
                    draft.meal.foods[foodIndex].condition = newCondition
                }))
            } catch (error) {
                get().setError(error)
            }
        },
    }))


interface Items {
    id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
    return items.filter(it => it.id != id)
}