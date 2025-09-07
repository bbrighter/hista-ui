import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { entity } from '../../api/generatedApi'
import { Ingredients, respToIngredients } from './ingredients'

interface State {
    ingredients: Ingredients
    ingredientsAreLoaded: boolean
}

interface Actions {
    setIngredients: (ingredients: Ingredients | entity.IngredientsResponse) => void
    getIngredients: () => Promise<void>
}

export interface IngredientStore extends State, Actions { }

const initialState: State = {
    ingredients: [],
    ingredientsAreLoaded: false,
}

export const createIngredientSlice: StateCreator<
    IngredientStore,
    [],
    [],
    IngredientStore> = ((set, get) => ({
        ...initialState,

        setIngredients: (ingredients) => {
            let useIngredients: Ingredients = []
            if (Array.isArray(ingredients)) {
                useIngredients = ingredients
            } else {
                useIngredients = respToIngredients(ingredients)
            }
            set(produce((draft: State) => {
                draft.ingredients = useIngredients
            }))
        },
        // Ingredients
        getIngredients: async () => {
            if (!get().ingredientsAreLoaded || get().ingredients.length == 0) {
                const resp = await client.api.GetIngredients()
                set(produce((draft: State) => {
                    draft.ingredients = respToIngredients(resp)
                    draft.ingredientsAreLoaded = true
                }))
            }
        },


    }))
