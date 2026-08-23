import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
	MedicineList,
	type MedicineListProps,
} from "../MedicineList/MedicineList";
import {
	getArchiveButton,
	getEditButton,
	getMedicineListItem,
	getSaveButton,
} from "./selectors";

describe("MedicineList component", () => {
	const onReorder = vi.fn();
	const onRename = vi.fn();
	const isNameUnique = vi.fn();

	const renderMedicineList = (props: Partial<MedicineListProps>) =>
		render(
			<MedicineList
				onReorder={onReorder}
				isNameUnique={isNameUnique}
				onRename={onRename}
				medicines={[]}
				{...props}
			/>,
		);

	it("Renders archived and non-archived", () => {
		renderMedicineList({
			medicines: [
				{ id: 1, isArchived: false, name: "Medicine" },
				{ id: 2, isArchived: true, name: "Archived medicine" },
			],
		});

		const medicineItem = getMedicineListItem("Medicine");
		const archiveIcon = getArchiveButton(medicineItem).querySelector("svg");
		expect(archiveIcon).not.toHaveClass("MuiSvgIcon-colorDisabled");
		const medicineText = within(medicineItem).getByText("Medicine");
		expect(window.getComputedStyle(medicineText).color).not.toBe("gray");

		const archivedItem = getMedicineListItem("Archived medicine");
		const unarchiveIcon = getArchiveButton(archivedItem).querySelector("svg");
		expect(unarchiveIcon).toHaveClass("MuiSvgIcon-colorDisabled");
		const archivedText = within(archivedItem).getByText("Archived medicine");
		expect(window.getComputedStyle(archivedText).color).toBe("gray");
	});

	it("Edit and save name", async () => {
		isNameUnique.mockReturnValue(true);
		renderMedicineList({
			medicines: [{ id: 1, isArchived: false, name: "Medicine" }],
		});

		const editButton = getEditButton();
		await userEvent.click(editButton);
		const input = screen.getByRole("textbox");
		await userEvent.type(input, " with more");
		const saveButton = getSaveButton();

		expect(saveButton).toBeEnabled();
		await userEvent.click(saveButton);
		expect(screen.queryByRole("textbox")).toBeNull();
		expect(onRename).toHaveBeenCalledExactlyOnceWith(1, "Medicine with more");
	});

	it("Saving not possible if name is not unique", async () => {
		isNameUnique.mockReturnValue(false);
		renderMedicineList({
			medicines: [{ id: 1, isArchived: false, name: "Medicine" }],
		});

		const editButton = getEditButton();
		await userEvent.click(editButton);
		const saveButton = getSaveButton();
		expect(saveButton).toBeDisabled();
	});

	it("Saving not possible if name is emoty", async () => {
		isNameUnique.mockReturnValue(false);
		renderMedicineList({
			medicines: [{ id: 1, isArchived: false, name: "Medicine" }],
		});

		const editButton = getEditButton();
		await userEvent.click(editButton);
		const input = screen.getByRole("textbox");
		await userEvent.clear(input);
		const saveButton = getSaveButton();
		expect(saveButton).toBeDisabled();
	});
});
