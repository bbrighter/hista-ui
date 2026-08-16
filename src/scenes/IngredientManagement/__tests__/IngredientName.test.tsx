import { createTheme } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IngredientName } from "../IngredientList/IngredientName";
import {
	getIngredientNameTextbox,
	getRenameCancelButton,
	getRenameSaveButton,
	queryNutrition,
} from "./selectors";

describe("IngredientName component", () => {
	const theme = createTheme();
	const isSaveable = vi.fn();
	const onSave = vi.fn();
	const setEditing = vi.fn();

	it("Name is displayed, nutrition is displayed", () => {
		render(
			<IngredientName
				isArchived={false}
				name="Name"
				nutrition={{ carbohydrate: 3, fat: 2, fiber: 1, protein: 10 }}
				isSaveable={isSaveable}
				onSave={onSave}
				setEditing={setEditing}
			/>,
		);

		screen.getByText("Name");
		expect(queryNutrition(2, 3, 1, 10)).not.toBeNull();
	});

	it("Non-archived is primary", () => {
		render(
			<IngredientName
				isArchived={false}
				name="Name"
				isSaveable={isSaveable}
				onSave={onSave}
				setEditing={setEditing}
			/>,
		);

		const name = screen.getByText("Name");
		expect(name).toHaveStyle({ color: theme.palette.text.primary });
	});

	it("Archived is disabled", () => {
		render(
			<IngredientName
				isArchived={true}
				name="Name"
				isSaveable={isSaveable}
				onSave={onSave}
				setEditing={setEditing}
			/>,
		);

		const name = screen.getByText("Name");
		expect(name).toHaveStyle({ color: theme.palette.text.disabled });
	});

	it("Edit mode, save saves and sets edit to false", async () => {
		isSaveable.mockReturnValueOnce(true);
		render(
			<IngredientName
				isArchived={false}
				name="Name"
				isEditing
				isSaveable={isSaveable}
				onSave={onSave}
				setEditing={setEditing}
			/>,
		);

		getIngredientNameTextbox();

		const saveButton = getRenameSaveButton();
		await userEvent.click(saveButton);

		expect(onSave).toHaveBeenCalledExactlyOnceWith("Name");
		expect(setEditing).toHaveBeenCalledExactlyOnceWith(false);
	});

	it("Edit mode, cannot save if not saveable", () => {
		isSaveable.mockReturnValueOnce(false);
		render(
			<IngredientName
				isArchived={false}
				name="Name"
				isEditing
				isSaveable={isSaveable}
				onSave={onSave}
				setEditing={setEditing}
			/>,
		);

		const saveButton = getRenameSaveButton();
		expect(saveButton).toBeDisabled();
	});

	it("Cancel edit mode", async () => {
		render(
			<IngredientName
				isArchived={false}
				name="Name"
				isEditing
				isSaveable={isSaveable}
				onSave={onSave}
				setEditing={setEditing}
			/>,
		);

		const cancelButton = getRenameCancelButton();
		await userEvent.click(cancelButton);

		expect(setEditing).toHaveBeenCalledExactlyOnceWith(false);
	});
});
