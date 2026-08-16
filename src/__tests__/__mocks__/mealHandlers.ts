import { HttpResponse, http } from "msw";

import type { hista } from "../../api/generatedApi";
import { createDefaultIngredient2, createIngredient } from "./fixtures/meal";

const mealHandlers = (baseUrl: string) => [
	http.get(`${baseUrl}/meals`, () =>
		HttpResponse.json({ meals: [{ id: 1, date: "2024-01-01T00:00:00Z" }] }),
	),
	http.post(`${baseUrl}/meals`, () =>
		HttpResponse.json({
			id: 2,
			date: "2025-06-06T12:12:12Z",
			freshness: 1,
			stressLevel: 1,
			isAlone: true,
			foods: [],
		}),
	),
	http.get(`${baseUrl}/meals/:id`, () =>
		HttpResponse.json({
			id: 1,
			date: "2024-01-01T00:00:00Z",
			freshness: 2,
			stressLevel: 1,
			isAlone: true,
			foods: [
				{ id: 10, foodCondition: "raw", ingredientId: 1, amount: 100 },
				{ id: 20, foodCondition: "cooked", ingredientId: 2 },
			],
		} as hista.MealResponse),
	),
	http.patch(`${baseUrl}/meals/:id`, () => HttpResponse.json({})),
	http.delete(`${baseUrl}/meals/:id`, () =>
		HttpResponse.json({
			ingredients: [{ id: 1, name: "ingredient1" }],
		}),
	),
];

const ingredientHandlers = (baseUrl: string) => [
	http.get(`${baseUrl}/ingredients`, () =>
		HttpResponse.json({ ingredients: [] }),
	),
	http.delete(`${baseUrl}/ingredients/:id`, () => HttpResponse.json({})),
	http.patch(`${baseUrl}/ingredients/:id`, () => HttpResponse.json({})),
];

const foodHandlers = (baseUrl: string) => [
	http.delete(`${baseUrl}/foods/:id`, () =>
		HttpResponse.json([createIngredient(), createDefaultIngredient2()]),
	),
	http.patch(`${baseUrl}/foods/:id/condition`, () => HttpResponse.json({})),
	http.patch(`${baseUrl}/foods/:id/amount`, () => HttpResponse.json({})),
	http.post(`${baseUrl}/meal/:id/foods`, async ({ request }) => {
		const body = (await request.json()) as
			| { ingredientName: string }
			| { ingredientId: number };
		if ("ingredientName" in body) {
			const name = body.ingredientName;
			return HttpResponse.json({
				food: { id: 1, ingredientId: 3, foodCondition: "raw" },
				ingredients: {
					ingredients: [
						createIngredient(),
						createDefaultIngredient2(),
						createIngredient({ id: 3, name: name, isArchived: false }),
					],
				},
			} as hista.PostFoodResponse);
		}
		return HttpResponse.json({
			food: { id: 1, ingredientId: body.ingredientId, foodCondition: "raw" },
			ingredients: {
				ingredients: [createIngredient(), createDefaultIngredient2()],
			},
		} as hista.PostFoodResponse);
	}),
	http.post(`${baseUrl}/meal/:id/foods/by-template/:templateId`, () =>
		HttpResponse.json({
			foods: [
				{ id: 5, foodCondition: "raw", ingredientId: 1 },
				{ id: 6, foodCondition: "cooked", ingredientId: 2 },
			],
		} satisfies hista.FoodsResponse),
	),
];

export { foodHandlers, ingredientHandlers, mealHandlers };
