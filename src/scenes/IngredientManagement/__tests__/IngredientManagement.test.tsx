import { createTheme } from "@mui/material/styles";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, HttpResponse, http } from "msw";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	createIngredient,
	createIngredients,
} from "@/__tests__/__mocks__/fixtures/meal";
import { server } from "@/__tests__/setupTest";
import useHista from "@/store/store";
import { IngredientManagement } from "../IngredientManagement";
import {
	getEditNutritionButton,
	getIngredientNameTextbox,
	getIngredientRow,
	getNutritionModal,
	getNutritionSaveButton,
	getRenameSaveButton,
	getStartRenameButton,
	getVisibilityButton,
	queryNutrition,
} from "./selectors";

describe("Ingredient Management integration tests", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	beforeEach(() => {
		const store = useHista.getState();
		store.resetIngredients();
	});

	it("Renders", async () => {
		server.use(
			http.get("/piid/:piid/ingredients", () =>
				HttpResponse.json(
					createIngredients([
						createIngredient({
							id: 1,
							name: "No nutrition",
							nutrition: undefined,
						}),
						createIngredient({
							id: 2,
							name: "Ingredient",
							nutrition: { carbohydrate: 1, fat: 2, fiber: 3, protein: 0 },
						}),
					]),
				),
			),
		);
		render(
			<MemoryRouter>
				<IngredientManagement />
			</MemoryRouter>,
		);

		await waitFor(() =>
			expect(screen.queryAllByRole("listitem")).toHaveLength(2),
		);
		getVisibilityButton();
		getIngredientRow("No nutrition");
		const nutritionRow = getIngredientRow("Ingredient");
		expect(queryNutrition(2, 1, 3, 0, nutritionRow)).toBeInTheDocument();
	});

	it("Show archived", async () => {
		server.use(
			http.get("/piid/:piid/ingredients", () =>
				HttpResponse.json(
					createIngredients([
						createIngredient({
							id: 1,
							name: "Archived",
							isArchived: true,
						}),
						createIngredient({
							id: 2,
							name: "Ingredient",
						}),
					]),
				),
			),
		);

		render(
			<MemoryRouter>
				<IngredientManagement />
			</MemoryRouter>,
		);

		await waitFor(() =>
			expect(screen.queryAllByRole("listitem")).toHaveLength(1),
		);
		await userEvent.click(getVisibilityButton());
		expect(screen.queryAllByRole("listitem")).toHaveLength(2);
	});

	it("Toggle archived", async () => {
		const theme = createTheme();
		server.use(
			http.get("/piid/:piid/ingredients", () =>
				HttpResponse.json(
					createIngredients([
						createIngredient({
							name: "Archived",
							isArchived: false,
						}),
					]),
				),
			),
		);

		render(
			<MemoryRouter>
				<IngredientManagement />
			</MemoryRouter>,
		);

		expect(await screen.findByText("Archived")).toHaveStyle({
			color: theme.palette.text.primary,
		});
		await userEvent.click(getVisibilityButton());

		const archiveButton = screen.getByTestId("archiveButton");
		await userEvent.click(archiveButton);

		expect(screen.getByText("Archived")).toHaveStyle({
			color: theme.palette.text.disabled,
		});
	});

	it("Rename", async () => {
		server.use(
			http.get("/piid/:piid/ingredients", () =>
				HttpResponse.json(
					createIngredients([
						createIngredient({
							name: "Name",
							isArchived: false,
						}),
					]),
				),
			),
		);

		render(
			<MemoryRouter>
				<IngredientManagement />
			</MemoryRouter>,
		);

		const renameButton = await waitFor(() => getStartRenameButton());
		await userEvent.click(renameButton);
		const input = getIngredientNameTextbox();
		await userEvent.type(input, " Neu");
		await userEvent.click(getRenameSaveButton());

		screen.getByText("Name Neu");
	});

	it("Edit nutrition", async () => {
		const theme = createTheme();
		server.use(
			http.get("/piid/:piid/ingredients", () =>
				HttpResponse.json(
					createIngredients([
						createIngredient({
							name: "Name",
							isArchived: false,
							nutrition: undefined,
						}),
					]),
				),
			),
		);

		render(
			<MemoryRouter>
				<IngredientManagement />
			</MemoryRouter>,
		);

		const nutritionButton = await waitFor(() => getEditNutritionButton());
		expect(nutritionButton).toHaveStyle({
			color: theme.palette.action.active,
		});
		await userEvent.click(nutritionButton);

		const modal = getNutritionModal();
		await userEvent.type(within(modal).getByLabelText("Fett"), "0");
		await userEvent.type(within(modal).getByLabelText("Kohlenhydrate"), "1");
		await userEvent.type(within(modal).getByLabelText("Ballaststoffe"), "2");
		await userEvent.type(within(modal).getByLabelText("Eiweiß"), "3");

		const saveButton = getNutritionSaveButton(modal);
		expect(saveButton).toBeEnabled();

		await userEvent.click(getNutritionSaveButton(modal));
		expect(queryNutrition(0, 1, 2, 3)).not.toBeNull();
	});

	it("Loading", async () => {
		vi.useFakeTimers();

		server.use(
			http.get("/piid/:piid/ingredients", async () => {
				await delay(100);
				return HttpResponse.json(createIngredients());
			}),
		);

		render(
			<MemoryRouter>
				<IngredientManagement />
			</MemoryRouter>,
		);

		const loader = screen.getByTestId("loading-spinner");
		expect(loader).toBeVisible();

		await act(async () => await vi.advanceTimersByTimeAsync(100));
		expect(loader).not.toBeVisible();
	});
});
