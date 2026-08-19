import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	createFood,
	createIngredient,
	createIngredients,
	createMeal,
	createPostFoodResponse,
} from "@/__tests__/fixtures/meal";
import { createTemplates } from "@/__tests__/fixtures/templates";
import {
	deleteFoodHandler,
	getIngredientListHandler,
	getMealHandler,
	postFoodByTemplateHandler,
	postFoodHandler,
} from "@/__tests__/mocks/mealHandlers";
import { getTemplateListHandler } from "@/__tests__/mocks/templateHander";
import { server } from "@/__tests__/setupTest";
import Meal from "../Meal";
import {
	getDateInput,
	getDeleteFoodButton,
	getFoodInput,
	getFoodRow,
	getIsAloneButtons,
	getNutritionChartButton,
	getNutritionKPIs,
} from "./selectors";

describe("Meal scene integration", () => {
	const renderMeal = (id: number = 1) =>
		render(
			<MemoryRouter initialEntries={[`/meals/${id}`]}>
				<Meal />
			</MemoryRouter>,
		);

	afterEach(() => vi.useRealTimers());

	it("Loading", async () => {
		vi.useFakeTimers();
		server.use(
			getMealHandler(createMeal(), 150),
			getTemplateListHandler(createTemplates(), 100),
			getIngredientListHandler(createIngredients(), 200),
		);
		renderMeal();

		expect(screen.getByTestId("loading-spinner")).toBeVisible();
		await act(async () => await vi.advanceTimersByTimeAsync(100));
		expect(screen.getByTestId("loading-spinner")).toBeVisible();
		await act(async () => await vi.advanceTimersByTimeAsync(50));
		expect(screen.getByTestId("loading-spinner")).toBeVisible();
		await act(async () => await vi.advanceTimersByTimeAsync(50));
		expect(screen.getByTestId("loading-spinner")).not.toBeVisible();
	});

	it("Renders everything", async () => {
		server.use(
			getMealHandler(
				createMeal({
					foods: [
						{ id: 1, ingredientId: 1, foodCondition: "raw", amount: 100 },
					],
				}),
			),
			getIngredientListHandler(
				createIngredient({
					id: 1,
					name: "ingredient1",
					nutrition: { carbohydrate: 10, fat: 0, fiber: 3, protein: 1 },
				}),
			),
		);
		renderMeal();

		// First get must by async
		await screen.findByText("ingredient1");

		getNutritionChartButton();
		const nutritionKpis = getNutritionKPIs();
		["0", "10", "3", "1"].forEach((val) => {
			expect(nutritionKpis).toHaveTextContent(val);
		});

		getDateInput();
		getIsAloneButtons("Alleine");
		getIsAloneButtons("Zusammen");

		getFoodInput();
	});

	it("Adding food by id adds food to list", async () => {
		server.use(
			getMealHandler(createMeal()),
			getIngredientListHandler(
				createIngredient({ id: 1, name: "ingredient1" }),
			),
			postFoodHandler(createPostFoodResponse({ id: 20, ingredientId: 1 })),
		);
		renderMeal();

		const foodInput = getFoodInput();
		await userEvent.type(foodInput, "ingredie");
		const menuItem = screen.getByText("ingredient1");
		await userEvent.click(menuItem);

		getFoodRow("ingredient1");
	});

	it("Adding food by name adds food to the list", async () => {
		server.use(
			getMealHandler(createMeal()),
			getIngredientListHandler({ ingredients: [] }),
			postFoodHandler(
				createPostFoodResponse(
					createFood({ ingredientId: 1 }),
					createIngredient({ id: 1, name: "ingredient1" }),
				),
			),
		);

		renderMeal();
		const foodInput = getFoodInput();
		await userEvent.type(foodInput, "ingredient1{Enter}");

		getFoodRow("ingredient1");
	});

	it("Adding template adds multiple foods to list", async () => {
		server.use(
			getMealHandler(createMeal()),
			getIngredientListHandler(
				createIngredients([
					createIngredient({ id: 1, name: "ingredient1" }),
					createIngredient({ id: 2, name: "ingredient2" }),
				]),
			),
			getTemplateListHandler(
				createTemplates({
					id: 1,
					name: "Template",
					items: [
						{ ingredientId: 1, condition: "raw", item: 1 },
						{ ingredientId: 2, condition: "cooked", item: 2 },
					],
				}),
			),
			postFoodByTemplateHandler({
				foods: [
					{ id: 1, foodCondition: "raw", ingredientId: 1 },
					{ id: 2, foodCondition: "cooked", ingredientId: 2 },
				],
			}),
		);

		renderMeal();

		const foodInput = getFoodInput();
		await userEvent.type(foodInput, "templa");
		const menuItem = screen.getByText("Template");
		await userEvent.click(menuItem);

		const row1 = getFoodRow("ingredient1");
		expect(row1).toHaveTextContent("Roh");
		const row2 = getFoodRow("ingredient2");
		expect(row2).toHaveTextContent("Gar");
	});

	it("Deleting food removes it from the list", async () => {
		server.use(
			getMealHandler(
				createMeal({
					foods: [{ id: 1, ingredientId: 1, foodCondition: "raw" }],
				}),
			),
			getIngredientListHandler(createIngredient({ id: 1, name: "Ingredient" })),
			deleteFoodHandler(createIngredients()),
		);

		renderMeal();

		const deleteButton = await waitFor(() => getDeleteFoodButton());
		await userEvent.click(deleteButton);
		expect(screen.queryByRole("listitem", { name: "Ingredient" })).toBeNull();
		const foodInput = getFoodInput();
		await userEvent.type(foodInput, "Ing");
		expect(screen.queryByText("Ingredient")).toBeNull();
	});
});
