import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { MealNutrition } from "./MealNutrition";

test("MealNutrition component", () => {
	render(<MealNutrition carbohydrate={10} fat={5} fiber={3} protein={0} />);

	const keyValues = { K: 10, F: 5, B: 3, E: 0 };
	for (const [k, v] of Object.entries(keyValues)) {
		const typo = screen.getByText(k);
		const parent = typo.closest("div");
		expect(parent).toHaveTextContent(`${v} g`);
	}
});
