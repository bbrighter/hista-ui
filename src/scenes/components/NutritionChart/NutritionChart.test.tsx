import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { render } from "@/__tests__/setupTest";
import { getNutritionChartData, NutritionChart } from "./NutritionChart";

describe("NutritionChart component", () => {
	const nutrition = { carbohydrate: 10, fat: 5, fiber: 3, protein: 0 };

	it("No legend", () => {
		render(<NutritionChart nutrition={nutrition} />);

		["Fett", "Kohlenhydrate", "Eiweiß", "Ballaststoffe"].forEach((s) => {
			expect(screen.queryByText(s)).toBeNull();
		});
	});

	it("legend, fibers hidden by default", () => {
		render(<NutritionChart nutrition={nutrition} showLegend />);

		["Fett", "Kohlenhydrate", "Eiweiß"].forEach((s) => {
			const entry = screen.getByRole("button", { name: s });
			expect(entry).not.toHaveClass("MuiChartsLegend-hidden");
		});

		const fiberEntry = screen.getByRole("button", { name: "Ballaststoffe" });
		expect(fiberEntry).toHaveClass("MuiChartsLegend-hidden");
	});

	it("Providing hidden items hides only those items", () => {
		render(
			<NutritionChart
				nutrition={nutrition}
				hiddenItems={[{ seriesId: "nutrition", type: "pie", dataIndex: 0 }]}
				showLegend
			/>,
		);

		const fatEntry = screen.getByRole("button", { name: "Fett" });
		expect(fatEntry).toHaveClass("MuiChartsLegend-hidden");
		const fiberEntry = screen.getByRole("button", { name: "Ballaststoffe" });
		expect(fiberEntry).not.toHaveClass("MuiChartsLegend-hidden");
	});

	it("Clicking hides items", async () => {
		render(<NutritionChart nutrition={nutrition} showLegend />);

		const fatEntry = screen.getByRole("button", { name: "Fett" });
		expect(fatEntry).not.toHaveClass("MuiChartsLegend-hidden");
		await userEvent.click(fatEntry);
		expect(fatEntry).toHaveClass("MuiChartsLegend-hidden");
	});
});

describe("getNutritionChartData", () => {
	const nutrition = { carbohydrate: 10, fat: 5, fiber: 3, protein: 0 };

	it("With fiber", () => {
		const chartData = getNutritionChartData(nutrition);
		expect(chartData).toHaveLength(4);
		[
			{
				id: 1,
				value: 5,
				label: "Fett",
				color: "#F4C542",
			},
			{
				id: 2,
				value: 0,
				label: "Eiweiß",
				color: "#b12323",
			},
			{
				id: 3,
				value: 10,
				label: "Kohlenhydrate",
				color: "#4A90E2",
			},
			{
				id: 4,
				value: 3,
				label: "Ballaststoffe",
				color: "#4CAF50",
			},
		].forEach((e, i) => {
			expect(chartData[i]).toStrictEqual(e);
		});
	});
});
