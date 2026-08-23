import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AddMedicineButton } from "../AddMedicineButton/AddMedicineButton";
import { getAddButton, getSaveButton } from "./selectors";

describe("AddMedicineButton component", () => {
	const isNameUnique = vi.fn();
	const onSave = vi.fn();

	it("Saving saves", async () => {
		isNameUnique.mockReturnValue(true);
		render(<AddMedicineButton isNameUnique={isNameUnique} onSave={onSave} />);

		const addButton = getAddButton();
		await userEvent.click(addButton);
		const input = screen.getByRole("textbox");
		await userEvent.type(input, "New name");

		const saveButton = getSaveButton();
		expect(saveButton).toBeEnabled();
		await userEvent.click(saveButton);

		expect(onSave).toHaveBeenCalledExactlyOnceWith("New name");
		expect(screen.queryByRole("textbox")).toBeNull();
	});

	it("Cancel cancels", async () => {
		render(<AddMedicineButton isNameUnique={isNameUnique} onSave={onSave} />);

		const addButton = getAddButton();
		await userEvent.click(addButton);
		const cancelButton = screen.getByRole("button", {
			name: "Umbenennen abbrechen",
		});
		await userEvent.click(cancelButton);
		expect(screen.queryByRole("textbox")).toBeNull();
	});

	it("Empty is forbidden", async () => {
		render(<AddMedicineButton isNameUnique={isNameUnique} onSave={onSave} />);

		const addButton = getAddButton();
		await userEvent.click(addButton);

		expect(getSaveButton()).toBeDisabled();
		const input = screen.getByRole("textbox");
		await userEvent.type(input, "   ");
		expect(getSaveButton()).toBeDisabled();
	});

	it("Saving forbidden if name is not unqiue", async () => {
		isNameUnique.mockReturnValue(false);
		render(<AddMedicineButton isNameUnique={isNameUnique} onSave={onSave} />);

		const addButton = getAddButton();
		await userEvent.click(addButton);

		expect(getSaveButton()).toBeDisabled();
	});
});
