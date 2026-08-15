import { screen } from "@testing-library/react";
import { expect } from "vitest";

export const getNutritionChartButton = () =>
	screen.getByTestId("open-chart-button");

export const getNutritionKPIs = () => screen.getByTestId("nutrition-kpis");

export const getDateInput = () =>
	screen.getByLabelText("Mahlzeit", {
		selector: "input",
	});

// export const getSlider = (label: string) => {
// 	const sliderLabel = screen.getByText(label);
// 	const box = sliderLabel.closest("div") as HTMLElement;
// 	expect(box).not.toBeNull();

// 	const input = box.querySelector("input");
// 	expect(input).not.toBeNull();
// 	return input as HTMLElement;
// };

export const getIsAloneButtons = (name: "Alleine" | "Zusammen") =>
	screen.getByRole("button", { name });

export const getFoodInput = () =>
	screen.getByLabelText("Zutaten", { selector: "input" });

export const getFoodRow = (name: string) => {
	const ingredientLabel = screen.getByText(name);
	const listItem = ingredientLabel.closest("li");
	expect(listItem).toBeInTheDocument();
	return listItem as HTMLElement;
};
