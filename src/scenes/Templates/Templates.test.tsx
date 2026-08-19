import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { createIngredient, createIngredients } from "@/__tests__/fixtures/meal";
import {
	createTemplate,
	createTemplates,
} from "@/__tests__/fixtures/templates";
import { getIngredientListHandler } from "@/__tests__/mocks/mealHandlers";
import { getTemplateListHandler } from "@/__tests__/mocks/templateHander";
import { server } from "@/__tests__/setupTest";
import useHista from "@/store/store";
import { Templates } from "./Templates";

describe("Template management", () => {
	beforeEach(() => {
		useHista.getState().resetIngredients();
	});

	const getAddTemplateButton = () => {
		const button = screen.getByText("Neue Vorlage", { selector: "button" });
		expect(button).toBeVisible();
		return button as HTMLElement;
	};

	const getTemplateRowByName = (name: string) => {
		const row = screen.getByText(name).closest("li");
		expect(row).toBeVisible();
		return row as HTMLElement;
	};

	const getNameInput = () =>
		within(screen.getByTestId("name-input")).getByRole("textbox");
	const getSaveButton = () => screen.getByTestId("save-button");
	const getIngredientSelect = () =>
		within(screen.getByTestId("ingredient-select")).getByRole("combobox");

	it("Render", async () => {
		server.use(
			getTemplateListHandler(
				createTemplates([createTemplate({ name: "Template" })]),
			),
		);
		render(
			<MemoryRouter>
				<Templates />
			</MemoryRouter>,
		);

		expect(await screen.findByText("Vorlagen")).toBeVisible();
		expect(getAddTemplateButton()).toBeDefined();

		expect(getTemplateRowByName("Template")).toBeDefined();
	});

	it("Add a template", async () => {
		server.use(
			getIngredientListHandler(
				createIngredients([
					createIngredient({ id: 1, name: "ingredient1" }),
					createIngredient({ id: 2, name: "ingredient2" }),
				]),
			),
		);
		render(
			<MemoryRouter>
				<Templates />
			</MemoryRouter>,
		);

		const addButton = await waitFor(() => getAddTemplateButton());
		await userEvent.click(addButton);

		expect(screen.getByText("Vorlage erstellen")).toBeVisible();
		expect(getSaveButton()).toBeDisabled();

		const nameInput = getNameInput();
		await userEvent.type(nameInput, "new template");
		expect(nameInput).toHaveValue("new template");
		expect(getSaveButton()).toBeDisabled();

		const ingredientSelect = getIngredientSelect();
		expect(ingredientSelect).toBeVisible();
		await userEvent.type(ingredientSelect, "ingredient1{enter}");
		const option = screen.getByText("ingredient1");
		await userEvent.click(option);
		expect(screen.getByDisplayValue("ingredient1")).toBeDefined();
		expect(getSaveButton()).not.toBeDisabled();

		const foodConditionToggle = screen.getByTestId("food-condition-chip");
		expect(foodConditionToggle).toHaveTextContent("Gar");
		expect(foodConditionToggle).toBeVisible();
		await userEvent.click(foodConditionToggle);
		expect(screen.getByTestId("food-condition-chip")).toHaveTextContent("Roh");

		await userEvent.click(getSaveButton());
		expect(screen.queryByText("Vorlage erstellen")).not.toBeVisible();
		expect(getTemplateRowByName("new template")).toBeVisible();
	});

	it("Delete a row", async () => {
		render(
			<MemoryRouter>
				<Templates />
			</MemoryRouter>,
		);

		const addButton = await waitFor(() => getAddTemplateButton());
		await userEvent.click(addButton);

		const deleteButton = screen.getByTestId("delete-row-button");
		expect(deleteButton).toBeInTheDocument();
		await userEvent.click(deleteButton);
		expect(screen.queryAllByTestId("delete-row-button")).toHaveLength(0);
	});
});
