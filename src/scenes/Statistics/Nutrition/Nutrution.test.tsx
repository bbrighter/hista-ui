import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { render } from "@/__tests__/setupTest";
import { NutritionStats } from "./NutritionStats";

const findToggleGroup = async () =>
	screen.findByTestId("toggle-interval-group");
const findToggleButton = async (button: "T" | "W" | "M" | "Q") => {
	const group = await findToggleGroup();
	return within(group).getByText(button);
};

const getListItem = (name: string) => {
	const listItem = screen.getByText(name).closest("li");
	expect(listItem).toBeInTheDocument();
	return listItem;
};

describe("Nutrition stats are displayed", () => {
	it("Renders", async () => {
		render(<NutritionStats />);

		// Verify interval toggle
		const toggle = await findToggleGroup();
		expect(toggle).toBeInTheDocument();

		// Verify list item with date and chart
		const listItem = getListItem("14.2.2026");
		expect(listItem?.querySelector("svg")).toBeInTheDocument();

		// Verify legend
		const legend = screen.getByTestId("nutrition-legend");
		const nutritions = ["F", "K", "E", "B"];
		nutritions.forEach((n) => {
			expect(legend).toHaveTextContent(n);
		});
	});

	it("Toggle interval", async () => {
		render(<NutritionStats />);

		const dayButton = await findToggleButton("T");
		expect(dayButton).toBeInTheDocument();
		const firstDayListItem = getListItem("14.2.2026");
		expect(firstDayListItem?.querySelector("svg")).toBeInTheDocument();
		const secondDayListItem = getListItem("15.2.2026");
		expect(secondDayListItem?.querySelector("svg")).toBeInTheDocument();

		const weekButton = await findToggleButton("W");
		await userEvent.click(weekButton);
		expect(weekButton).toBeInTheDocument();
		const weekListItem = getListItem("Woche 5");
		expect(weekListItem?.querySelector("svg")).toBeInTheDocument();
	});

	it("Toggle fiber", async () => {
		render(<NutritionStats />);

		const fiberLegendEntry = await screen.findByTestId("nutrition-legend-3");
		expect(fiberLegendEntry).toHaveAttribute("aria-selected", "false");
		await userEvent.click(fiberLegendEntry);

		expect(fiberLegendEntry).toHaveAttribute("aria-selected", "true");
	});
});
