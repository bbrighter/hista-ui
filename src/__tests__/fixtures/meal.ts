import type { hista } from "@/api/generatedApi";

export const createMeal = (
	overrides: Partial<hista.MealResponse> = {},
): hista.MealResponse => ({
	id: 1,
	date: "2024-12-03",
	freshness: 2,
	stressLevel: 1,
	isAlone: true,
	foods: [],
	...overrides,
});

export const createMealList = (
	meals: Array<hista.MealMetaResponse> | Partial<hista.MealMetaResponse> = [
		createMeal(),
	],
): hista.MealListResponse =>
	Array.isArray(meals) ? { meals: meals } : { meals: [createMeal(meals)] };

export const createIngredient = (
	overrides: Partial<hista.IngredientResponse> = {},
): hista.IngredientResponse => ({
	id: 1,
	name: "ingredient1",
	isArchived: false,
	nutrition: { carbohydrate: 20, fat: 5, fiber: 0, protein: 3 },
	...overrides,
});

export const createIngredients = (
	ingredients:
		| Array<hista.IngredientResponse>
		| Partial<hista.IngredientResponse> = [createIngredient()],
): hista.IngredientListResponse =>
	Array.isArray(ingredients)
		? { ingredients }
		: { ingredients: [createIngredient(ingredients)] };

export const createFood = (
	overrides: Partial<hista.FoodResponse> = {},
): hista.FoodResponse => ({
	id: 1,
	foodCondition: "raw",
	ingredientId: 1,
	...overrides,
});

export const createPostFoodResponse = (
	overrideFood?: Partial<hista.FoodResponse>,
	overrideIngredient?: Partial<hista.IngredientResponse>,
): hista.PostFoodResponse => ({
	food: createFood(overrideFood),
	ingredients: createIngredients([createIngredient(overrideIngredient)]),
});
