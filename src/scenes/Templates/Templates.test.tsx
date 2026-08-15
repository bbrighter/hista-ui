import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import {
	createTemplate,
	createTemplates,
} from "@/__tests__/__mocks__/fixtures/templates";
import { server } from "@/__tests__/setupTest";
import { Templates } from "./Templates";

describe("Template management", () => {
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
			http.get("/piid/:piid/templates", () =>
				HttpResponse.json(
					createTemplates([createTemplate({ name: "Template" })]),
				),
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
