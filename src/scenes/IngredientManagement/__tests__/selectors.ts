import { screen, within } from "@testing-library/react";
import { expect } from "vitest";

export const queryNutrition = (
	fat: number,
	carbs: number,
	fibers: number,
	protein: number,
	row?: HTMLLIElement,
) => {
	const relevant = row ? within(row) : screen;
	const nutrition = relevant.queryByText(
		`F: ${fat} | K: ${carbs} | B: ${fibers} | E: ${protein}`,
	);
	if (!nutrition) return null;
	expect(nutrition).toHaveClass("MuiListItemText-secondary");
	return nutrition;
};

export const getVisibilityButton = () =>
	screen.getByRole("checkbox", {
		name: "Archivierte anzeigen",
	});

export const getIngredientNameTextbox = (row?: HTMLLIElement) =>
	row ? within(row).getByRole("textbox") : screen.getByRole("textbox");
export const getRenameCancelButton = (row?: HTMLLIElement) => {
	const relevant = row ? within(row) : screen;
	return relevant.getByRole("button", {
		name: "Umbenennen abbrechen",
	});
};

export const getRenameSaveButton = () =>
	screen.getByRole("button", {
		name: "Umbenennen speichern",
	});
export const getEditNutritionButton = () =>
	screen.getByRole("button", { name: "Nährwerte" });

export const getNutritionModal = () => screen.getByRole("dialog");

export const getNutritionSaveButton = (modal: HTMLElement) =>
	within(modal).getByRole("button", { name: "Speichern" });

export const getNutritionCancelButton = (modal: HTMLElement) =>
	within(modal).getByRole("button", { name: "Abbrechen" });

export const getIngredientRow = (name: string) => {
	const ingredient = screen.getByText(name);
	const row = ingredient.closest("li") as HTMLLIElement;
	expect(row).not.toBeNull();
	return row;
};

export const getStartRenameButton = () =>
	screen.getByRole("button", { name: "Umbenennen" });
