import type { StateCreator } from "zustand";

import type {
	IngredientStore,
	NonFunctionProperties,
	StoreType,
} from "../store.type";
import type { Ingredient } from "./../types";

type State = NonFunctionProperties<IngredientStore>;

const initialState = (): State => ({
	ingredients: [],
});

export const createIngredientSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	IngredientStore
> = (set) => ({
	...initialState(),

	addIngredient(_ing: Ingredient) {},
	removeIngredient(_id: number) {},

	resetIngredients() {
		set(initialState());
	},

	setIngredients: (ingredients) => {
		set((state) => {
			if (!Array.isArray(ingredients)) {
				throw Error("Invalid setIngredients: ingredients is no array");
			}
			state.ingredients = ingredients;
		});
	},
	updateIngredient: (id: number, update: Partial<Ingredient>) => {
		set((state) => {
			const index = state.ingredients.findIndex((ing) => ing.id === id);
			if (index !== -1) {
				state.ingredients[index] = { ...state.ingredients[index], ...update };
			}
		});
	},
});
