import {
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import useHista from "../../store/store";
import Meal from "./Meal";

describe("test meals list", () => {
	const findSliderComponent = async (
		lbl: string,
		expectedColor: "Primary" | "Warning" | "Error",
	) => {
		const label = await screen.findByText(lbl);
		const box = label.closest("div");
		expect(box).toBeInTheDocument();

		const slider = box?.querySelector(".MuiSlider-root");
		const colorRegex = new RegExp(`${expectedColor}`);
		expect(slider?.getAttribute("class")).toMatch(colorRegex);
	};

	const findIngredientRow = async (name: string): Promise<HTMLElement> => {
		const ingredientLabel = await screen.findByText(name);
		const listItem = ingredientLabel.closest("li");
		expect(listItem).toBeInTheDocument();
		return listItem as HTMLElement;
	};

	const isButtonPressed = (options: {
		title?: string;
		text?: string;
		parent?: HTMLElement;
	}) => {
		const parent = options.parent ? within(options.parent) : screen;
		const button = options.title
			? parent.getByTitle(options.title)
			: parent.getByText(options.text ?? "invalid");
		return button.getAttribute("aria-pressed") === "true";
	};

	it("everything is rendered", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		expect(
			await screen.findByDisplayValue("01.01.2024 01:00"),
		).toBeInTheDocument();

		expect(isButtonPressed({ title: "Alleine" })).toBeTruthy();
		expect(isButtonPressed({ title: "Zusammen" })).toBeFalsy();

		await findSliderComponent("Stress", "Primary");
		await findSliderComponent("Frische", "Error");

		const ingredient1Row = await findIngredientRow("ingredient1");
		expect(ingredient1Row).toBeInTheDocument();
		const condition1 = within(ingredient1Row).getByTestId(
			"food-condition-chip",
		);
		expect(within(condition1).getByText("Roh")).toBeInTheDocument();

		const ingredient2Row = await findIngredientRow("ingredient2");
		const condition2 = within(ingredient2Row).getByTestId(
			"food-condition-chip",
		);
		expect(within(condition2).getByText("Gar")).toBeInTheDocument();

		expect(screen.queryAllByTestId("number-input")).toHaveLength(2);

		const kpis = screen.getByTestId("nutrition-kpis");
		expect(kpis).toBeInTheDocument();
		expect(kpis).toHaveTextContent(/F\s*5 g/);
		expect(kpis).toHaveTextContent(/K\s*20 g/);
		expect(kpis).toHaveTextContent(/B\s*0 g/);
		expect(kpis).toHaveTextContent(/E\s*3 g/);
	});

	it("deleting food is possible", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		expect(await findIngredientRow("ingredient1")).toBeInTheDocument();
		const buttons = screen.queryAllByTestId("delete-food-button");
		expect(buttons).toHaveLength(2);

		await userEvent.click(buttons[0]);

		expect(screen.queryByText("ingredient1")).not.toBeInTheDocument();
	});

	it("toggling raw/cooked", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		const ingredient1Row = await findIngredientRow("ingredient1");
		expect(within(ingredient1Row).queryByText("Roh")).toBeInTheDocument();
		expect(within(ingredient1Row).queryByText("Gar")).not.toBeInTheDocument();

		const buttons = screen.queryAllByTestId("food-condition-chip");
		expect(buttons).toHaveLength(2);
		// Set cooked
		const button = buttons[0];
		await userEvent.click(button);
		expect(within(ingredient1Row).queryByText("Roh")).not.toBeInTheDocument();
		expect(within(ingredient1Row).queryByText("Gar")).toBeInTheDocument();

		// Set raw
		await userEvent.click(button);
		expect(within(ingredient1Row).queryByText("Roh")).toBeInTheDocument();
		expect(within(ingredient1Row).queryByText("Gar")).not.toBeInTheDocument();
	});

	it("toggling alone/together", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		await waitFor(() => {
			expect(isButtonPressed({ title: "Alleine" })).toBeTruthy();
			expect(isButtonPressed({ title: "Zusammen" })).toBeFalsy();
		});

		// Click together
		const togetherButton = screen.getByTitle("Zusammen");
		await userEvent.click(togetherButton);

		expect(isButtonPressed({ title: "Alleine" })).toBeFalsy();
		expect(isButtonPressed({ title: "Zusammen" })).toBeTruthy();

		// Click alone
		const aloneButton = screen.getByTitle("Alleine");
		await userEvent.click(aloneButton);

		expect(isButtonPressed({ title: "Alleine" })).toBeTruthy();
		expect(isButtonPressed({ title: "Zusammen" })).toBeFalsy();
	});

	it("date changes", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		const dateInput = await screen.findByLabelText("Mahlzeit", {
			selector: "input",
		});
		expect(dateInput).toBeInTheDocument();
		// Todo: Test interactivity!
	});

	it("add food with new ingredient", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		const ingredientInput = await screen.findByLabelText("Zutaten");
		expect(ingredientInput).toBeInTheDocument();

		await userEvent.type(ingredientInput, "new ingredient {enter}");
		await screen.findByText("new ingredient");

		await waitFor(() => {
			const ingredients = useHista.getState().ingredients;
			expect(ingredients).toHaveLength(3);
		});
	});

	it("add food with existing ingredient", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		const ingredientInput = await screen.findByLabelText("Zutaten");
		expect(ingredientInput).toBeInTheDocument();

		await userEvent.type(ingredientInput, "ingredient2");
		await userEvent.keyboard("{ArrowDown}{Enter}");

		await waitFor(() => {
			expect(screen.queryAllByText("ingredient2")).toHaveLength(2);
			const ingredients = useHista.getState().ingredients;
			expect(ingredients).toHaveLength(2);
		});
	});

	it("edit amount", async () => {
		render(
			<MemoryRouter>
				<Meal />
			</MemoryRouter>,
		);

		const row1 = await findIngredientRow("ingredient1");
		const amountInput = within(row1)
			.getByTestId("number-input")
			.querySelector("input") as HTMLElement;
		expect(amountInput).toBeInTheDocument();
		expect(amountInput).toHaveValue(100);

		// await userEvent.clear(amountInput)
		// await userEvent.type(amountInput, "10")
		fireEvent.change(amountInput, { target: { value: "" } });
		fireEvent.change(amountInput, { target: { value: "10" } });
		expect(amountInput).toHaveValue(10);

		const row2 = await findIngredientRow("ingredient2");
		const amountInputEmpty = within(row2)
			.getByTestId("number-input")
			.querySelector("input");
		expect(amountInputEmpty).toBeInTheDocument();
		expect(amountInputEmpty).toHaveValue(null);
	});
});
