import { delay, HttpResponse, http } from "msw";
import type { hista } from "../../api/generatedApi";
import {
	createFood,
	createIngredients,
	createMeal,
	createMealList,
	createPostFoodResponse,
} from "../fixtures/meal";

export const getMealListHandler = (resp: hista.MealListResponse) =>
	http.get("/piid/:piid/meals", () => HttpResponse.json(resp));
export const getMealHandler = (resp: hista.MealResponse, ms?: number) =>
	http.get("/piid/:piid/meals/:id", async () => {
		if (ms) {
			await delay(ms);
		}
		return HttpResponse.json(resp);
	});
export const postMealHandler = (resp: hista.MealResponse) =>
	http.post("/piid/:piid/meals", () => HttpResponse.json(resp));
const patchMealHandler = () =>
	http.patch("/piid/:piid/meals/:id", () => HttpResponse.json({}));
const deleteMealHandler = (resp: hista.IngredientListResponse) =>
	http.delete("/piid/:piid/meals/:id", () => HttpResponse.json(resp));

const mealHandlers = [
	getMealListHandler(createMealList()),
	getMealHandler(createMeal()),
	postMealHandler(createMeal()),
	patchMealHandler(),
	deleteMealHandler(createIngredients()),
];

export const getIngredientListHandler = (
	resp: hista.IngredientListResponse | hista.IngredientResponse,
	ms?: number,
) =>
	http.get("/piid/:piid/ingredients", async () => {
		if (ms) await delay(ms);
		return HttpResponse.json(
			"ingredients" in resp ? resp : { ingredients: [resp] },
		);
	});
const deleteIngredientHandler = () =>
	http.delete("/piid/:piid/ingredients/:id", () => HttpResponse.json({}));
const patchIngredientHandler = () =>
	http.patch("/piid/:piid/ingredients/:id", () => HttpResponse.json({}));

const ingredientHandlers = [
	getIngredientListHandler(createIngredients()),
	deleteIngredientHandler(),
	patchIngredientHandler(),
];

export const deleteFoodHandler = (
	resp: hista.IngredientListResponse | hista.IngredientResponse,
) =>
	http.delete("/piid/:piid/foods/:id", () =>
		HttpResponse.json("ingredients" in resp ? resp : { ingredients: [resp] }),
	);
const patchFoodConditionHandler = () =>
	http.patch("/piid/:piid/foods/:id/condition", () => HttpResponse.json({}));
const patchFoodAmountHandler = () =>
	http.patch("/piid/:piid/foods/:id/amount", () => HttpResponse.json({}));
export const postFoodHandler = (resp: hista.PostFoodResponse) =>
	http.post("/piid/:piid/meal/:id/foods", () => HttpResponse.json(resp));
export const postFoodByTemplateHandler = (
	resp: hista.FoodsResponse | hista.FoodResponse,
) =>
	http.post("/piid/:piid/meal/:id/foods/by-template/:id", () =>
		HttpResponse.json("foods" in resp ? resp : { foods: [resp] }),
	);

const foodHandlers = [
	deleteFoodHandler(createIngredients()),
	patchFoodConditionHandler(),
	patchFoodAmountHandler(),
	postFoodHandler(createPostFoodResponse()),
	postFoodByTemplateHandler(createFood()),
];

// const foodHandlers = (baseUrl: string) => [
// 	http.delete(`${baseUrl}/foods/:id`, () =>
// 		HttpResponse.json([createIngredient(), createDefaultIngredient2()]),
// 	),
// 	http.patch(`${baseUrl}/foods/:id/condition`, () => HttpResponse.json({})),
// 	http.patch(`${baseUrl}/foods/:id/amount`, () => HttpResponse.json({})),
// 	http.post(`${baseUrl}/meal/:id/foods`, async ({ request }) => {
// 		const body = (await request.json()) as
// 			| { ingredientName: string }
// 			| { ingredientId: number };
// 		if ("ingredientName" in body) {
// 			const name = body.ingredientName;
// 			return HttpResponse.json({
// 				food: { id: 1, ingredientId: 3, foodCondition: "raw" },
// 				ingredients: {
// 					ingredients: [
// 						createIngredient(),
// 						createDefaultIngredient2(),
// 						createIngredient({ id: 3, name: name, isArchived: false }),
// 					],
// 				},
// 			} as hista.PostFoodResponse);
// 		}
// 		return HttpResponse.json({
// 			food: { id: 1, ingredientId: body.ingredientId, foodCondition: "raw" },
// 			ingredients: {
// 				ingredients: [createIngredient(), createDefaultIngredient2()],
// 			},
// 		} as hista.PostFoodResponse);
// 	}),
// 	http.post(`${baseUrl}/meal/:id/foods/by-template/:templateId`, () =>
// 		HttpResponse.json({
// 			foods: [
// 				{ id: 5, foodCondition: "raw", ingredientId: 1 },
// 				{ id: 6, foodCondition: "cooked", ingredientId: 2 },
// 			],
// 		} satisfies hista.FoodsResponse),
// 	),
// ];

export { foodHandlers, ingredientHandlers, mealHandlers };
