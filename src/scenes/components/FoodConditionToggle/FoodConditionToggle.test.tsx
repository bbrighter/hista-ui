import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FoodConditionToggle } from "./FoodConditionToggle";

describe("Food condition toggle", () => {
	const onClick = vi.fn();

	it("Cooked is shown", async () => {
		render(<FoodConditionToggle condition="cooked" onClick={onClick} />);

		const button = await screen.findByTestId("food-condition-chip");
		expect(button).toBeVisible();
		expect(button).toHaveTextContent("Gar");
	});

	it("Raw is shown", async () => {
		render(<FoodConditionToggle condition="raw" onClick={onClick} />);

		const button = await screen.findByTestId("food-condition-chip");
		expect(button).toBeVisible();
		expect(button).toHaveTextContent("Roh");
	});

	it("Can be clicked", async () => {
		render(<FoodConditionToggle condition="raw" onClick={onClick} />);

		const button = await screen.findByTestId("food-condition-chip");
		await userEvent.click(button);
		expect(onClick).toHaveBeenCalled();
	});
});
