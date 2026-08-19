// import '../../__tests__/mocks/errorStoreMock'
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import SymptomManagement from "./SymptomManagement";

const findButtonWithinCategory = (
	categoryName: string,
	title: string,
): HTMLElement => {
	const categoryHeading = screen.getByText(categoryName);
	const accordionSummary = categoryHeading.closest("h3") as HTMLElement;
	const element = within(accordionSummary).getByTitle(title);
	expect(element).toBeInTheDocument();
	return element;
};

const getDeleteButton = (categoryName: string) =>
	findButtonWithinCategory(categoryName, "Löschen");
const getRenameButton = (categoryName: string) =>
	findButtonWithinCategory(categoryName, "Kategorie umbenennen");
const getExpandIcon = (categoryName: string) =>
	findButtonWithinCategory(categoryName, "Ausklappen");

describe("SymptomManagement", () => {
	it("renders categories", async () => {
		render(<SymptomManagement />);

		const addButton = await screen.findByText("Neue Kategorie");
		expect(addButton).toBeInTheDocument();
		expect(await screen.findByText("cat (2)")).toBeInTheDocument();

		getDeleteButton("cat (2)");
		getRenameButton("cat (2)");
		getExpandIcon("cat (2)");
	});

	it("Expanding", async () => {
		render(<SymptomManagement />);

		await waitFor(() => {
			getExpandIcon("cat (2)");
		});
		await userEvent.click(getExpandIcon("cat (2)"));

		expect(screen.getByText("symptom1")).toBeInTheDocument();
		expect(screen.getByText("symptom2")).toBeInTheDocument();

		await userEvent.click(getExpandIcon("cat (2)"));
		expect(screen.queryByText("symptom1")).not.toBeInTheDocument();
	});

	it("renaming category can be canceled", async () => {
		render(<SymptomManagement />);

		const renameButton = await waitFor(() => getRenameButton("cat (2)"));

		await userEvent.click(renameButton);

		const textField = screen.getByLabelText("Kategoriename");
		expect(textField).toBeInTheDocument();
		const cancelButton = screen.getByTitle("Umbenennen abbrechen");
		await userEvent.click(cancelButton);
		getRenameButton("cat (2)");
	});

	it("renaming category can be saved", async () => {
		render(<SymptomManagement />);

		const renameButton = await waitFor(() => getRenameButton("cat (2)"));

		await userEvent.click(renameButton);

		const textField = screen.getByLabelText("Kategoriename");
		expect(textField).toBeInTheDocument();

		const saveButton = screen.getByTitle("Umbenennen speichern");
		expect(saveButton).toBeDisabled();

		await userEvent.clear(textField);
		await userEvent.type(textField, "new cat");

		expect(textField).toHaveValue("new cat");
		expect(saveButton).not.toBeDisabled();

		await userEvent.click(saveButton);

		getRenameButton("new cat (2)");
	});

	it("deleting category", async () => {
		render(<SymptomManagement />);

		const deleteButton = await waitFor(() => getDeleteButton("cat (2)"));
		expect(deleteButton).toBeDisabled();

		const enabledDeleteButton = getDeleteButton("cat with no symptoms (0)");
		expect(enabledDeleteButton).not.toBeDisabled();
		await userEvent.click(enabledDeleteButton);
		expect(
			screen.getByText("cat with no symptoms wirklich löschen?"),
		).toBeInTheDocument();
		await userEvent.click(screen.getByTitle("Löschen bestätigen"));

		expect(
			screen.queryByText("cat with no symptoms (0)"),
		).not.toBeInTheDocument();
	});
});
