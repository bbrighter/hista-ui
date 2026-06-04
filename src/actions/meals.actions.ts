import { client } from "../api/api";
import {
	type FoodCondition,
	type Freshness,
	respToFood,
	respToIngredients,
	respToMeal,
	respToMetaMeals,
} from "../store";
import useHista from "../store/store";

export const meals = {
	list: async () => {
		const { setMeals, meals, setLoaded } = useHista.getState();
		if (meals.length > 0) return;

		const resp = await client.ListMeals();

		setMeals(respToMetaMeals(resp));
		setLoaded("meals");
	},

	post: async () => {
		const now = new Date();
		const resp = await client.PostMeal({ date: now.toISOString() });
		const { meals, setMeal, setMeals } = useHista.getState();

		const newMeal = respToMeal(resp);
		const newMeals = [...meals];
		newMeals.unshift({ id: resp.id, date: now });
		setMeals(newMeals);
		setMeal(newMeal);

		return newMeal.id;
	},

	get: async (id: number) => {
		const resp = await client.GetMeal(id);

		const { setMeal, setLoaded } = useHista.getState();
		setMeal(respToMeal(resp));
		setLoaded("meal");
	},

	delete: async (id: number) => {
		const resp = await client.DeleteMeal(id);

		const { removeMeal, setIngredients } = useHista.getState();
		removeMeal(id);
		setIngredients(respToIngredients(resp));
	},

	patchDate: async (id: number, dateIsoString: string) => {
		await client.PatchMeal(id, { date: dateIsoString });

		const { updateMeal, setMetaMeal } = useHista.getState();
		updateMeal({ date: new Date(dateIsoString) });
		setMetaMeal(id, { date: new Date(dateIsoString) });
	},

	patchFreshness: async (id: number, freshness: Freshness) => {
		const params = { freshness: freshness };
		await client.PatchMeal(id, params);

		const { updateMeal } = useHista.getState();
		updateMeal(params);
	},

	patchIsAlone: async (id: number, isAlone: boolean) => {
		const params = { isAlone: isAlone };
		await client.PatchMeal(id, params);

		const { updateMeal } = useHista.getState();
		updateMeal(params);
	},

	patchStressLevel: async (id: number, stressLevel: number) => {
		const params = { stressLevel: stressLevel };
		await client.PatchMeal(id, params);

		const { updateMeal } = useHista.getState();
		updateMeal(params);
	},

	postFoodByName: async (mealId: number, name: string) => {
		const resp = await client.PostFood(mealId, { ingredientName: name });

		const { addFood, setIngredients } = useHista.getState();
		addFood(respToFood(resp.food));
		setIngredients(respToIngredients(resp.ingredients));
	},

	postFoodById: async (mealId: number, ingredientId: number) => {
		const resp = await client.PostFood(mealId, { ingredientId: ingredientId });

		const { addFood } = useHista.getState();
		addFood(respToFood(resp.food));
	},

	postFoodsByTemplate: async (mealId: number, templateId: number) => {
		const { addFood } = useHista.getState();

		const resp = await client.PostFoodByTemplate(mealId, templateId);
		const foods = resp.foods.map((f) => respToFood(f));
		addFood(foods);
	},

	deleteFood: async (id: number) => {
		const resp = await client.DeleteFood(id);

		const { removeFood, setIngredients } = useHista.getState();
		removeFood(id);
		setIngredients(respToIngredients(resp));
	},

	patchFoodCondition: async (id: number, condition: FoodCondition) => {
		await client.PatchFoodCondition(id, { condition: condition });

		const { updateFood } = useHista.getState();
		updateFood(id, { condition: condition });
	},

	patchFoodAmount: async (id: number, amount: number) => {
		const value = amount > 0 ? amount : undefined;
		await client.PatchFoodAmount(id, { amount: value });

		const { updateFood } = useHista.getState();
		updateFood(id, { amount: value });
	},
};
