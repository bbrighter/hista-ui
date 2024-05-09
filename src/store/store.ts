import { create } from "zustand"
import { client, is401Response } from "../api/api"
import { produce } from "immer"
import { internalAuth, meals, symptoms } from "../api/generatedApi"
import { Meals, MetaMeal, respToMetaMeals } from "./meals"
import { FoodCondition, Meal, respToMeal } from "./meal"
import { Ingredients, respToIngredients } from "./ingredients"
import { ConditionEvents, respToConditionEvents } from "./conditionEvents"
import { ConditionEvent, respToConditionEvent } from "./conditionEvent"
import { SymptomCategories, respToSymptoms } from "./symptom"
import { respToCondition } from "./condition"

interface State {
    isAuthenticated: boolean
    meals: Meals
    meal: Meal
    ingredients: Ingredients
    conditionEvents: ConditionEvents
    conditionEvent: ConditionEvent
    symptoms: SymptomCategories
}

interface Actions {
    // Auth
    logout: () => void
    login: (password: string, userName: string) => Promise<boolean>

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

    // ConditionEvents
    getConditionEvents: () => Promise<void>,
    postConditionEvent: () => Promise<number | void>,

    // ConditionEvent
    getConditionEvent: (eventId: number) => Promise<void>,
    deleteConditionEvent: (eventId: number) => Promise<void>,
    setConditionEventDate: (date: Date) => Promise<void>,

    // Symptoms
    getSymptoms: () => Promise<void>,
    postConditionByName: (symptomName: string, symptomCategoryId: number) => Promise<void>,
    postConditionById: (symtpomId: number) => Promise<void>,
    postSymptomCategory: (name: string) => Promise<number>,
    patchCondition: (conditionId: number, severity: number) => Promise<void>,
    deleteCondition: (conditionId: number) => Promise<void>,

}

interface Store extends State, Actions { }

const initialState: State = {
    isAuthenticated: window.localStorage.isAuthenticated || false,
    meals: [],
    meal: { date: new Date(), foods: [] },
    ingredients: [],
    conditionEvents: [],
    conditionEvent: { id: 0, date: new Date(), conditions: [] },
    symptoms: [],
}

const useHista = create<Store>((set, get) => ({
    ...initialState,

    logout() { set(produce((draft: State) => { draft.isAuthenticated = false })) },
    login: async (password, userName) => {
        const params: internalAuth.AuthParams = { Password: password, UserId: userName }
        let isAuthenticated = false
        try {
            const token = await client.api.Login(params)
            isAuthenticated = true
            window.localStorage.token = token.Bearer
            window.localStorage.user = token.UserId
        } catch (error) {
            if (is401Response(error)) {
                isAuthenticated = false
            }
        } finally {
            window.localStorage.isAuthenticated = isAuthenticated
            set(produce((draft: State) => {
                draft.isAuthenticated = isAuthenticated
            }))
        }
        return get().isAuthenticated
    },

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

    // ConditionEvents
    getConditionEvents: async () => {
        try {
            const resp = await client.symptoms.GetConditionEvents()
            const states = respToConditionEvents(resp)
            set(produce((draft: State) => {
                draft.conditionEvents = states
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    postConditionEvent: async () => {
        const date = new Date()
        const params: symptoms.ConditionEventRequestParams = { date: date.toISOString() }
        try {
            const resp = await client.symptoms.CreateConditionEvent(params)
            set(produce((draft: State) => {
                draft.conditionEvents.unshift({ id: resp.id, date: date })
            }))
            return resp.id
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },

    // ConditionEvent
    getConditionEvent: async (eventId: number) => {
        try {
            const resp = await client.symptoms.GetConditionEvent(eventId)
            const event = respToConditionEvent(resp)
            set(produce((draft: State) => {
                draft.conditionEvent = event
            }))

        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    deleteConditionEvent: async (eventId: number) => {
        try {
            await client.symptoms.DeleteConditionEvent(eventId)
            set(produce((draft: State) => {
                draft.conditionEvents = removeItemById(eventId, get().conditionEvents)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    setConditionEventDate: async (date: Date) => {
        try {
            const params: symptoms.ConditionEventRequestParams = { date: date.toISOString() }
            await client.symptoms.PatchDate(get().conditionEvent.id, params)
            set(produce((draft: State) => {
                draft.conditionEvent.date = date
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },

    // Symtpoms
    getSymptoms: async () => {
        try {
            const resp = await client.symptoms.GetSymptoms()
            const symtpoms = respToSymptoms(resp)
            set(produce((draft: State) => {
                draft.symptoms = symtpoms
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    postConditionByName: async (symptomName: string, symptomCategoryId: number) => {
        try {
            const params: symptoms.ConditionRequestParams = {
                categoryId: symptomCategoryId,
                symptomName: symptomName
            }
            const resp = await client.symptoms.PostCondition(get().conditionEvent.id, params)
            const condition = respToCondition(resp.condition)
            const symptoms = respToSymptoms(resp.symptoms)
            set(produce((draft: State) => {
                draft.conditionEvent.conditions.unshift(condition)
                draft.symptoms = symptoms
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    postConditionById: async (symptomId: number) => {
        try {
            const resp = await client.symptoms.PostConditionBySymptomID(get().conditionEvent.id, symptomId)
            const condition = respToCondition(resp)
            set(produce((draft: State) => {
                draft.conditionEvent.conditions.unshift(condition)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    postSymptomCategory: async (name: string): Promise<number> => {
        const params: symptoms.PostSymptomCategoryRequest = { name: name }
        try {
            const resp = await client.symptoms.PostSymptomCategory(params)
            set(produce((draft: State) => {
                draft.symptoms.unshift({ categoryId: resp.id, categoryName: name, symptoms: [] })
            }))
            return resp.id
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
            return 0
        }
    },
    patchCondition: async (conditionId: number, severity: number): Promise<void> => {
        const params: symptoms.PatchSeverityRequestParams = {
            severity: severity
        }
        try {
            await client.symptoms.PatchCondition(conditionId, params)
            const conditionIndex = get().conditionEvent.conditions.findIndex(c => c.id == conditionId)
            set(produce((draft: State) => {
                draft.conditionEvent.conditions[conditionIndex].severity = severity
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    },
    deleteCondition: async (conditionId: number): Promise<void> => {
        try {
            await client.symptoms.DeleteCondition(conditionId)
            set(produce((draft: State) => {
                draft.conditionEvent.conditions = removeItemById(conditionId, get().conditionEvent.conditions)
            }))
        } catch (error) {
            if (is401Response(error)) {
                get().logout()
            }
        }
    }

}))

export default useHista


interface Items {
    id: number
}
function removeItemById<T extends Items>(id: number, items: Array<T>): Array<T> {
    return items.filter(it => it.id != id)
}