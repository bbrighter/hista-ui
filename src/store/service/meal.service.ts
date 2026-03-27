import { client } from "../../api/api";
import useHista from "../store";
import { FoodCondition, Freshness, respToFood, respToIngredients, respToMeal, respToMetaMeals } from "../types";


export const mealService = {
  listMeals: async () => {
    const { setMeals, meals } = useHista.getState()
    if (meals.length > 0) return

    const resp = await client.ListMeals()

    setMeals(respToMetaMeals(resp))
  },

  postMeal: async () => {
    const now = new Date()
    const resp = await client.PostMeal({ date: now.toISOString() })
    const {  meals, setMeal, setMeals } = useHista.getState()

    const newMeal = respToMeal(resp)
    const newMeals = [...meals]
    newMeals.unshift({ id: resp.id, date: now })
    setMeals(newMeals)
    setMeal(newMeal)

    return newMeal.id
  },

  getMeal: async (id: number) => {
    const resp = await client.GetMeal(id)
    
    const { setMeal } = useHista.getState()
    setMeal(respToMeal(resp))
  },

  deleteMeal: async (id: number) => {
    const resp = await client.DeleteMeal(id)

    const { removeMeal, setIngredients } = useHista.getState()
    removeMeal(id)
    setIngredients(respToIngredients(resp))
  },

  patchMealDate: async (id: number, dateIsoString: string) => {
    await client.PatchMeal(id, { date: dateIsoString })

    const { updateMeal, setMetaMeal } = useHista.getState()
    updateMeal({ date: new Date(dateIsoString) })
    setMetaMeal(id, { date: new Date(dateIsoString) })
  },

  patchMealFreshness: async (id: number, freshness: Freshness) => {
    const params = { freshness: freshness }
    await client.PatchMeal(id, params)

    const { updateMeal } = useHista.getState()
    updateMeal(params)
  },

  patchMealIsAlone: async (id: number, isAlone: boolean) => {
    const params = { isAlone: isAlone }
    await client.PatchMeal(id, params)

    const { updateMeal } = useHista.getState()
    updateMeal(params)
  },

  patchMealStressLevel: async (id: number, stressLevel: number) => {
    const params = { stressLevel: stressLevel }
    await client.PatchMeal(id, params)

    const { updateMeal } = useHista.getState()
    updateMeal(params)
  },

  postFoodByName: async (mealId: number, name: string) => {
    const resp = await client.PostFood(mealId, { ingredientName: name })

    const { addFood, setIngredients } = useHista.getState()
    addFood(respToFood(resp.food))
    setIngredients(respToIngredients(resp.ingredients))
  },

  postFoodById: async (mealId: number, ingredientId: number) => {
    const resp = await client.PostFood(mealId, { ingredientId: ingredientId })

    const { addFood } = useHista.getState()
    addFood(respToFood(resp.food))

  },

  deleteFood: async (id: number) => {
    const resp = await client.DeleteFood(id)

    const { removeFood, setIngredients } = useHista.getState()
    removeFood(id)
    setIngredients(respToIngredients(resp))
  },

  patchFoodCondition: async (id: number, condition: FoodCondition) => {
    await client.PatchFoodCondition(id, { condition: condition })

    const { updateFood } = useHista.getState()
    updateFood(id, { condition: condition })
  },

  patchFoodAmount: async (id: number, amount: number) => {
    await client.PatchFoodAmount(id, { amount: amount })

    const { updateFood } = useHista.getState()
    updateFood(id, { amount: amount > 0 ? amount : undefined })
  },
}