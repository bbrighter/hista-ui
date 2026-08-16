import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EditNutritionButton } from "../IngredientList/EditNutritionButton";
import {
	getEditNutritionButton,
	getNutritionCancelButton,
	getNutritionModal,
	getNutritionSaveButton,
} from "./selectors";

describe("EditNutritionButton component", () => {
	const updateNutrition = vi.fn();
	it("Opens, renders and closes", async () => {
		render(
			<EditNutritionButton
				ingredientId={1}
				updateNutrition={updateNutrition}
			/>,
		);

		const openButton = getEditNutritionButton();
		await userEvent.click(openButton);

		const modal = getNutritionModal();
		expect(modal).toBeVisible();
		expect(modal).toHaveTextContent("Nährwerte pro 100 g");
		["Eiweiß", "Fett", "Ballaststoffe", "Kohlenhydrate"].forEach((s) => {
			expect(within(modal).getByLabelText(s)).toHaveValue(null);
		});
		getNutritionSaveButton(modal);
		const cancelButton = getNutritionCancelButton(modal);
		await userEvent.click(cancelButton);

		expect(getNutritionModal()).not.toBeVisible();
	});

	it("Existing nutrition is displayed", async () => {
		render(
			<EditNutritionButton
				ingredientId={1}
				updateNutrition={updateNutrition}
				nutrition={{ carbohydrate: 5, fat: 3, fiber: 2, protein: 1 }}
			/>,
		);

		await userEvent.click(getEditNutritionButton());
		const modal = getNutritionModal();
		Object.entries({
			Eiweiß: 1,
			Fett: 3,
			Ballaststoffe: 2,
			Kohlenhydrate: 5,
		}).forEach(([key, value]) => {
			expect(within(modal).getByLabelText(key)).toHaveValue(value);
		});
	});

	it("Saving works", async () => {
		render(
			<EditNutritionButton
				ingredientId={1}
				updateNutrition={updateNutrition}
				nutrition={{ carbohydrate: 5, fat: 3, fiber: 2, protein: 1 }}
			/>,
		);
		await userEvent.click(getEditNutritionButton());
		const modal = getNutritionModal();
		const fatInput = within(modal).getByLabelText("Fett");
		await userEvent.type(fatInput, "0");
		await userEvent.click(getNutritionSaveButton(modal));

		expect(modal).not.toBeVisible();
		expect(updateNutrition).toHaveBeenCalledExactlyOnceWith(1, {
			carbohydrate: 5,
			fat: 30,
			fiber: 2,
			protein: 1,
		});
	});

	it("Can only be saved if all entries are filled", async () => {
		render(
			<EditNutritionButton
				ingredientId={1}
				updateNutrition={updateNutrition}
			/>,
		);

		await userEvent.click(getEditNutritionButton());
		const modal = getNutritionModal();
		expect(getNutritionSaveButton(modal)).toBeDisabled();

		await userEvent.type(within(modal).getByLabelText("Fett"), "0");
		expect(getNutritionSaveButton(modal)).toBeDisabled();
		await userEvent.type(within(modal).getByLabelText("Kohlenhydrate"), "30");
		expect(getNutritionSaveButton(modal)).toBeDisabled();
		await userEvent.type(within(modal).getByLabelText("Ballaststoffe"), "30");
		expect(getNutritionSaveButton(modal)).toBeDisabled();
		await userEvent.type(within(modal).getByLabelText("Eiweiß"), "3");
		expect(getNutritionSaveButton(modal)).toBeEnabled();
	});

	it("Cannot be saved if single value > 100", async () => {
		render(
			<EditNutritionButton
				ingredientId={1}
				updateNutrition={updateNutrition}
				nutrition={{ carbohydrate: 3, fat: 120, fiber: 0, protein: 2 }}
			/>,
		);

		await userEvent.click(getEditNutritionButton());
		const modal = getNutritionModal();
		expect(getNutritionSaveButton(modal)).toBeDisabled();
	});
});
