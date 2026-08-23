import { screen, within } from "@testing-library/react";

export const getAddButton = () =>
	screen.getByRole("button", {
		name: "Medikament hinzufügen",
	});

export const getSaveButton = () =>
	screen.getByRole("button", {
		name: "Umbenennen speichern",
	});

export const getMedicineListItem = (name: string) =>
	screen.getByText(name).closest("li") as HTMLLIElement;

export const getArchiveButton = (el: HTMLLIElement) =>
	within(el).getByTestId("archiveButton");

export const getEditButton = (el?: HTMLLIElement) =>
	(el ? within(el) : screen).getByTestId("editButton");
