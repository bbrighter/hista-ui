import { screen, within } from "@testing-library/react";

export const getTagByName = (name: string) =>
	screen.getByRole("button", { name: name });

export const isTagActive = (elem: HTMLElement): boolean => {
	return elem.className.includes("colorPrimary");
};

export const getSeveritySlider = () => {
	const symptom = screen.getByText("Schwere");
	const listItem = symptom.closest("div") as HTMLElement;
	const slider = within(listItem).getByRole("slider");
	return slider;
};

export const getDescriptionTextBox = (): HTMLTextAreaElement =>
	screen.getByRole("textbox", {
		name: "Zusätzliche Infos",
	});
