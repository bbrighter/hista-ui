import type { ChartsDataProviderProps } from "@mui/x-charts/ChartsDataProvider";
import type { PieSeriesType } from "@mui/x-charts/models";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render } from "@/__tests__/setupTest";
import { getNutritionChartData, NutritionChart } from "./NutritionChart";
import { NutritionLegend } from "./NutritionLegend";

const { providerProps } = vi.hoisted(() => ({
	providerProps: vi.fn(),
}));

vi.mock("@mui/x-charts/ChartsDataProvider", () => ({
	ChartsDataProvider: providerProps,
}));

describe("NutritionChart component", () => {
	const nutrition = { carbohydrate: 10, fat: 5, fiber: 3, protein: 0 };

	it("Initially hidden items", () => {
		render(<NutritionChart nutrition={nutrition} />);

		expect(providerProps).toHaveBeenCalled();
		const props = providerProps.mock.calls.at(
			-1,
		)?.[0] as ChartsDataProviderProps;
		expect(props.hiddenItems).toBeUndefined();
		expect(props.initialHiddenItems).toStrictEqual([
			{
				type: "pie",
				seriesId: "nutrition",
				dataIndex: 3,
			},
		]);
	});

	it("Correct series are used", () => {
		render(<NutritionChart nutrition={nutrition} />);

		expect(providerProps).toHaveBeenCalled();
		const props = providerProps.mock.calls.at(
			-1,
		)?.[0] as ChartsDataProviderProps;

		const series = props.series?.[0] as PieSeriesType;
		expect(series.data).toHaveLength(4);
		expect(series.data).toContainEqual({
			value: 5,
			name: "Fett",
			id: 0,
			color: "#F4C542",
			shortName: "F",
		});
		expect(series.data).toContainEqual({
			value: 0,
			name: "Eiweiß",
			id: 1,
			color: "#b12323",
			shortName: "E",
		});
		expect(series.data).toContainEqual({
			value: 10,
			name: "Kohlenhydrate",
			id: 2,
			color: "#4A90E2",
			shortName: "K",
		});
		expect(series.data).toContainEqual({
			value: 3,
			name: "Ballaststoffe",
			id: 3,
			color: "#4CAF50",
			shortName: "B",
		});
	});

	it("Hidden items", () => {
		render(
			<NutritionChart
				nutrition={nutrition}
				hiddenItems={[{ seriesId: "nutrition", type: "pie", dataIndex: 2 }]}
			/>,
		);

		expect(providerProps).toHaveBeenCalled();
		const props = providerProps.mock.calls.at(
			-1,
		)?.[0] as ChartsDataProviderProps;
		expect(props.hiddenItems).toHaveLength(1);
		expect(props.hiddenItems).toStrictEqual([
			{ seriesId: "nutrition", type: "pie", dataIndex: 2 },
		]);
	});
});

describe("NutritionLegend", () => {
	const onClick = vi.fn();

	it("Renders and on click works", async () => {
		render(<NutritionLegend onEntryClick={onClick} hiddenItemIds={[]} />);

		["B", "F", "K", "E"].forEach((n) => {
			screen.getByText(n);
		});

		const legendEntry = screen.getByTestId("nutrition-legend-1");
		await userEvent.click(legendEntry);
		expect(onClick).toHaveBeenCalledExactlyOnceWith(1);
	});

	it("Hidden items are faded out", () => {
		render(<NutritionLegend onEntryClick={onClick} hiddenItemIds={[1]} />);

		const legendEntry = screen.getByTestId("nutrition-legend-1");
		expect(legendEntry).toHaveAttribute("aria-selected", "false");
		screen.debug(legendEntry);

		[0, 2, 3].forEach((n) => {
			const entry = screen.getByTestId(`nutrition-legend-${n}`);
			expect(entry).toHaveAttribute("aria-selected", "true");
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
				id: 0,
				value: 5,
				name: "Fett",
				color: "#F4C542",
				shortName: "F",
			},
			{
				id: 1,
				value: 0,
				name: "Eiweiß",
				color: "#b12323",
				shortName: "E",
			},
			{
				id: 2,
				value: 10,
				name: "Kohlenhydrate",
				color: "#4A90E2",
				shortName: "K",
			},
			{
				id: 3,
				value: 3,
				name: "Ballaststoffe",
				color: "#4CAF50",
				shortName: "B",
			},
		].forEach((e, i) => {
			expect(chartData[i]).toStrictEqual(e);
		});
	});
});
