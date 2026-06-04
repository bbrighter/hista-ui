import { screen, within } from "@testing-library/react";

export const getIngredientSelect = () => {
	return within(screen.getByTestId("ingredientSelect")).getByRole(
		"combobox",
	) as HTMLElement;
};

export const getFilter = () => {
	return screen.getByTestId("severityFilter") as HTMLElement;
};
