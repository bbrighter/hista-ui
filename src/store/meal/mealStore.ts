import { StateCreator } from "zustand"
import { client, is401Response } from "../../api/api"
import { produce } from "immer"
import { meals } from "../../api/generatedApi"
import { Meals, MetaMeal, respToMetaMeals } from "./meals"
import { FoodCondition, Meal, respToMeal } from "./meal"
import { Ingredients, respToIngredients } from "./ingredients"
import { SymptomStore } from "../symptom/symptomStore"
import { AuthStore } from "../auth/authStore"

interface State {
    meals: Meals
    meal: Meal
    ingredients: Ingredients
}

interface Actions {
    // Meals
    getMeals: () => Promise<void>
    postMeal: () => Promise<number | void>
    deleteMeal: (id: number) => Promise<void>

    // Meal
    setMealDate: (dateString: string) => Promise<void>
    getMeal: (id: number) => Promise<void>

    // Ingredients
    getIngredients: () => Promise<void>

    // Foods
    postFood: (ingredientName: string) => Promise<void>

    // Food
    deleteFood: (foodId: number) => Promise<void>
    patchFoodCondition: (foodId: number, newCondition: FoodCondition) => Promise<void>
}

export interface MealStore extends State, Actions { }

const initialState: State = {
    meals: [],
    meal: { date: new Date(), foods: [] },
    ingredients: [],
}

export const createMealSlice: StateCreator<AuthStore & MealStore & SymptomStore, [], [], MealStore> = ((set, get) => ({
    ...initialState,

    // Meals
    getMeals: async () => {
        try {
            const resp = await client.meals.GetMeals()
            set(produce((draft: State) => {
                draft.meals = respToMetaMeals(resp)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    postMeal: async (): Promise<number | void> => {
        try {
            const params: meals.MealParams = {
                date: new Date().toISOString()
            }
            const resp = await client.meals.PostMeal(params)
            const id = resp.id
            set(produce((draft: State) => {
                const newMeal: MetaMeal = {
                    date: get().meal.date,
                    id: id
                }
                draft.meals.push(newMeal)
                draft.meal.id = id
            }))
            return id
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    deleteMeal: async (id: number): Promise<void> => {
        try {
            await client.meals.DeleteMeal(id)
            set(produce((draft: State) => {
                draft.meals = removeItemById(id, get().meals)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },

    // Meal
    setMealDate: async (dateString: string) => {
        const params: meals.MealParams = { date: dateString }
        const id = get().meal.id
        try {
            if (!id) return
            await client.meals.PatchMealTime(id, params)
            const date = new Date(dateString)
            set(produce((draft: State) => {
                draft.meal.date = date
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }

    },
    getMeal: async (id: number) => {
        try {
            const resp = await client.meals.GetMeal(id)
            set(produce((draft: State) => {
                draft.meal = respToMeal(resp)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },


    // Ingredients
    getIngredients: async () => {
        try {
            const resp = await client.meals.GetIngredients()
            set(produce((draft: State) => {
                draft.ingredients = respToIngredients(resp)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },

    // Foods
    postFood: async (ingredientName: string) => {
        const mealId = get().meal.id
        const condition = "cooked"
        if (!mealId) return
        try {
            const params: meals.FoodParams = {
                condition: condition,
                ingredientName: ingredientName
            }
            const resp = await client.meals.PostFood(mealId, params)
            set(produce((draft: State) => {
                draft.meal.foods.unshift({
                    condition: condition,
                    id: resp.id,
                    ingredient: ingredientName,
                })
            }))
            await get().getIngredients()
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }

    },

    // Food
    deleteFood: async (foodId: number) => {
        const mealId = get().meal.id || 0
        try {
            await client.meals.DeleteFood(mealId, foodId)
            set(produce((draft: State) => {
                draft.meal.foods = removeItemById(foodId, get().meal.foods)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },

    patchFoodCondition: async (foodId: number, newCondition: FoodCondition) => {
        const params: meals.FoodConditionParams = { Condition: newCondition }
        const mealId = get().meal.id || 0
        const foodIndex = get().meal.foods.findIndex(f => f.id == foodId)
        try {
            await client.meals.PatchFoodCondition(mealId, foodId, params)
            set(produce((draft: State) => {
                draft.meal.foods[foodIndex].condition = newCondition
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
}))


interface Items {
    id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
    return items.filter(it => it.id != id)
}