import { screen, within } from "@testing-library/react";

export const getIntakeRows = (
	name: string,
	el?: HTMLElement,
): Array<HTMLLIElement> => {
	const names = (el ? within(el) : screen).getAllByText(name);
	return names.map((n) => n.closest("li")) as Array<HTMLLIElement>;
};

export const getTodaysRow = (name: string, el?: HTMLElement): HTMLElement => {
	const rows = getIntakeRows(name, el);
	return rows[0];
};

export const getBlockByDate = (date: string): HTMLUListElement =>
	screen.getByText(date).closest("ul") as HTMLUListElement;

export const getIncreaseButton = (el?: HTMLElement) =>
	(el ? within(el) : screen).getByRole("button", { name: "+" });
export const getDecreaseButton = (el?: HTMLElement) =>
	(el ? within(el) : screen).getByRole("button", { name: "-" });
