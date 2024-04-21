import { create } from "zustand"
import { client, is401Response } from "../api/api"
import { produce } from "immer"
import { internalAuth, meals } from "../api/generatedApi"
import { Meals, MetaMeal, respToMetaMeals } from "./meals"
import { Meal, respToMeal } from "./meal"

interface State {
    isAuthenticated: boolean
    meals: Meals
    meal: Meal
}

interface Actions {
    // Auth
    logout: () => void
    login: (password: string, userName: string) => Promise<boolean>

    // Meals
    getMeals: () => Promise<void>

    // Meal
    setDate: (dateString: string) => void
    getMeal: (id: number) => Promise<void>
    postMeal: () => Promise<number | void>
}

interface Store extends State, Actions { }

const initialState: State = {
    isAuthenticated: window.sessionStorage.isAuthenticated || false,
    meals: [],
    meal: { date: new Date(), foods: [] },
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
            window.sessionStorage.token = token.Bearer
            window.sessionStorage.user = token.UserId
        } catch (error) {
            if (is401Response(error)) {
                isAuthenticated = false
            }
        } finally {
            window.sessionStorage.isAuthenticated = isAuthenticated
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

    // Meal
    setDate: (dateString: string) => {
        const date = new Date(dateString)
        set(produce((draft: State) => {
            draft.meal.date = date
        }))
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
    }

}))

export default useHista