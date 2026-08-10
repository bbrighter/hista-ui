import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getNutritionChartData, NutritionChart } from "./NutritionChart";

describe("NutritionChart component", () => {
	const nutrition = { carbohydrate: 10, fat: 5, fiber: 3, protein: 0 };

	it("No fiber, no legend", () => {
		render(<NutritionChart nutrition={nutrition} hideFiber />);

		["Fett", "Kohlenhydrate", "Eiweiß"].forEach((s) => {
			expect(screen.queryByText(s)).toBeNull();
		});
	});

	it("No fiber, legend", () => {
		render(<NutritionChart nutrition={nutrition} hideFiber showLegend />);

		["Fett", "Kohlenhydrate", "Eiweiß"].forEach((s) => {
			screen.getByText(s);
		});
	});

	it("Fiber, legend", () => {
		render(<NutritionChart nutrition={nutrition} showLegend />);

		["Fett", "Kohlenhydrate", "Eiweiß", "Ballaststoffe"].forEach((s) => {
			screen.getByText(s);
		});
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

	it("Without fiber", () => {
		const chartData = getNutritionChartData(nutrition, true);
		expect(chartData).toHaveLength(3);
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
		].forEach((e, i) => {
			expect(chartData[i]).toStrictEqual(e);
		});
	});
});
