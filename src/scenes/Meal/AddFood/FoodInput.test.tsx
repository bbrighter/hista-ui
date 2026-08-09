import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FoodInput } from "./FoodInput";

describe("FoodInput component", () => {
	const listIngredients = vi.fn();
	const listTemplates = vi.fn();
	const postFoodById = vi.fn();
	const postFoodByName = vi.fn();
	const postFoodsByTemplate = vi.fn();
	const fns = {
		listIngredients,
		listTemplates,
		postFoodById,
		postFoodByName,
		postFoodsByTemplate,
	};

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("Renders", async () => {
		render(
			<FoodInput
				mealId={1}
				options={[
					{ id: 1, name: "opt1", type: "food" },
					{ id: 1, name: "temp1", type: "template" },
				]}
				{...fns}
			/>,
		);

		const input = screen.getByRole("combobox");
		expect(input).toBeVisible();

		await userEvent.click(input);
		expect(screen.getByText("opt1")).toBeVisible();
		expect(screen.getByText("temp1")).toBeVisible();
	});

	it("Post food by name", async () => {
		render(
			<FoodInput
				mealId={1}
				options={[
					{ id: 1, name: "opt1", type: "food" },
					{ id: 1, name: "temp1", type: "template" },
				]}
				{...fns}
			/>,
		);

		const input = screen.getByRole("combobox");
		await userEvent.type(input, "new{enter}");

		expect(postFoodByName).toHaveBeenCalledWith(1, "new");

		expect(input).toHaveValue("");
	});

	it("Post food by id", async () => {
		render(
			<FoodInput
				mealId={1}
				options={[
					{ id: 2, name: "opt1", type: "food" },
					{ id: 1, name: "temp1", type: "template" },
				]}
				{...fns}
			/>,
		);

		const input = screen.getByRole("combobox");
		await userEvent.type(input, "op");
		await userEvent.click(screen.getByText("opt1"));

		expect(postFoodById).toHaveBeenCalledWith(1, 2);
		expect(input).toHaveValue("");
	});

	it("Post foods by template", async () => {
		render(
			<FoodInput
				mealId={1}
				options={[
					{ id: 1, name: "opt1", type: "food" },
					{ id: 3, name: "temp1", type: "template" },
				]}
				{...fns}
			/>,
		);

		const input = screen.getByRole("combobox");
		await userEvent.type(input, "tem");
		const option = screen.getByText("temp1");
		expect(option.closest("li")).toContainElement(
			screen.getByTestId("DinnerDiningIcon"),
		);
		await userEvent.click(option);

		expect(postFoodsByTemplate).toHaveBeenCalledWith(1, 3);
		expect(input).toHaveValue("");
	});
});
