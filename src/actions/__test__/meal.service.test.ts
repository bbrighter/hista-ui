import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createIngredient,
	createIngredients,
	createMeal,
} from "@/__tests__/fixtures/meal";
import { createTemplates } from "@/__tests__/fixtures/templates";
import {
	deleteFoodHandler,
	getIngredientListHandler,
	getMealHandler,
	postFoodByTemplateHandler,
	postFoodHandler,
	postMealHandler,
} from "@/__tests__/mocks/mealHandlers";
import { getTemplateListHandler } from "@/__tests__/mocks/templateHander";
import { server } from "@/__tests__/setupTest";
import { client } from "../../api/api";
import useHista from "../../store/store";
import { actions } from "..";

describe("meal service, meals", () => {
	const spyListMeals = vi.spyOn(client, "ListMeals");

	beforeEach(() => {
		const store = useHista.getState();
		store.resetMeals();
	});

	it("list meals", async () => {
		await actions.meals.list();

		const { meals } = useHista.getState();
		expect(meals).toHaveLength(1);
	});

	it("list meals only called once", async () => {
		await actions.meals.list();
		await actions.meals.list();

		expect(spyListMeals).toHaveBeenCalledOnce();
	});

	it("post meal", async () => {
		server.use(postMealHandler(createMeal({ id: 2 })));

		await actions.meals.list();

		const id = await actions.meals.post();
		expect(id).toBe(2);

		const { meals } = useHista.getState();
		expect(meals).toHaveLength(2);
	});

	it("get meal", async () => {
		await actions.meals.list();
		await actions.meals.get(1);

		const { meal } = useHista.getState();
		expect(meal).toBeDefined();
	});

	it("delete meal", async () => {
		await actions.meals.list();
		await actions.meals.delete(1);

		const { meals } = useHista.getState();
		expect(meals).toHaveLength(0);
	});
});

describe("meal service, single meal", () => {
	beforeEach(() => {
		server.use(
			getMealHandler(createMeal()),
			getIngredientListHandler(createIngredients()),
		);
	});

	it("patchMealDate", async () => {
		// server.use(getMealHandler(createMeal()));
		await actions.meals.get(1);

		const now = new Date();
		await actions.meals.patchDate(1, now.toISOString());

		const { meal } = useHista.getState();
		expect(meal.date).toStrictEqual(now);
	});

	it("post food by name", async () => {
		server.use(
			getMealHandler(createMeal({ id: 1 })),
			getIngredientListHandler({ id: 1, isArchived: false, name: "old" }),
			postFoodHandler({
				food: { id: 1, ingredientId: 2, foodCondition: "raw" },
				ingredients: {
					ingredients: [
						{ id: 1, isArchived: false, name: "old" },
						{ id: 2, isArchived: false, name: "name" },
					],
				},
			}),
		);
		await actions.meals.get(1);

		await actions.meals.postFoodByName(1, "name");

		const { meal, ingredients } = useHista.getState();
		expect(meal.foods).toContainEqual({
			ingredientId: 2,
			condition: "raw",
			id: 1,
		});
		expect(ingredients).toHaveLength(2);
	});

	it("post food by id", async () => {
		server.use(getIngredientListHandler(createIngredient({ id: 1 })));
		await actions.meals.get(1);

		await actions.meals.postFoodById(1, 1);

		const { meal } = useHista.getState();
		expect(meal.foods).toContainEqual({
			ingredientId: 1,
			condition: "raw",
			id: 1,
		});
	});

	it("delete food", async () => {
		server.use(
			getMealHandler(
				createMeal({
					foods: [{ id: 20, ingredientId: 1, foodCondition: "raw" }],
				}),
			),
			getIngredientListHandler(createIngredients({ id: 1 })),
			deleteFoodHandler({ ingredients: [] }),
		);

		await actions.meals.get(1);
		await actions.ingredients.list();
		await actions.meals.deleteFood(20);

		const { ingredients, meal } = useHista.getState();
		expect(meal.foods).toHaveLength(0);
		expect(ingredients).toHaveLength(0);
	});

	it("patch food condition", async () => {
		server.use(
			getMealHandler(
				createMeal({
					foods: [{ id: 10, foodCondition: "raw", ingredientId: 1 }],
				}),
			),
		);
		await actions.meals.get(1);

		await actions.meals.patchFoodCondition(10, "cooked");

		const { meal } = useHista.getState();
		const changedFood = meal.foods.find((f) => f.id === 10);
		expect(changedFood?.condition).toBe("cooked");
	});

	it("patch food amount", async () => {
		server.use(
			getMealHandler(
				createMeal({
					foods: [{ id: 10, foodCondition: "raw", ingredientId: 1 }],
				}),
			),
		);
		await actions.meals.get(1);

		await actions.meals.patchFoodAmount(10, 100);

		const { meal } = useHista.getState();
		const changedFood = meal.foods.find((f) => f.id === 10);
		expect(changedFood?.amount).toBe(100);
	});

	it("patch food amount to undefined", async () => {
		server.use(
			getMealHandler(
				createMeal({
					foods: [
						{ id: 10, foodCondition: "raw", ingredientId: 1, amount: 100 },
					],
				}),
			),
		);
		await actions.meals.get(1);

		await actions.meals.patchFoodAmount(10, 0);

		const { meal } = useHista.getState();
		const changedFood = meal.foods.find((f) => f.id === 10);
		expect(changedFood?.amount).toBe(undefined);
	});

	it("post foods by template", async () => {
		server.use(
			getMealHandler(createMeal()),
			getIngredientListHandler(
				createIngredients([
					{ id: 1, isArchived: false, name: "Ing1" },
					{ id: 2, isArchived: false, name: "Ing2" },
				]),
			),
			getTemplateListHandler(
				createTemplates([
					{
						id: 1,
						name: "Template",
						items: [
							{ ingredientId: 1, condition: "raw", item: 1 },
							{ ingredientId: 2, condition: "cooked", item: 2 },
						],
					},
				]),
			),
			postFoodByTemplateHandler({
				foods: [
					{ id: 10, foodCondition: "raw", ingredientId: 1 },
					{ id: 20, foodCondition: "cooked", ingredientId: 2 },
				],
			}),
		);

		await actions.meals.get(1);
		await actions.templates.list();

		await actions.meals.postFoodsByTemplate(1, 1);

		const { meal } = useHista.getState();
		expect(meal.foods).toHaveLength(2);
		expect(meal.foods).toContainEqual({
			id: 10,
			ingredientId: 1,
			condition: "raw",
		});
		expect(meal.foods).toContainEqual({
			id: 20,
			ingredientId: 2,
			condition: "cooked",
		});
	});
});
