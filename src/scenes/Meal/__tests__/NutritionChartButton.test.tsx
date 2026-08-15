import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { expect, test, vi } from "vitest";
import { NutritionChartButton } from "../NutritionChart/NutritionChartButton";

test("NutritionChartButton component", async () => {
	const getStatistics = vi.fn();
	const date = new Date("2022-11-13");

	getStatistics.mockResolvedValue(undefined);
	render(
		<NutritionChartButton
			date={dayjs(date)}
			getStatistics={getStatistics}
			nutrition={{ carbohydrate: 10, fat: 3, fiber: 2, protein: 1 }}
		/>,
	);

	const openButton = screen.getByTestId("open-chart-button");
	await userEvent.click(openButton);

	const modal = screen.getByRole("dialog");
	expect(modal).toBeVisible();

	expect(getStatistics).toHaveBeenCalledExactlyOnceWith(
		"day",
		new Date("2022-11-13T00:00:00.000Z"),
		new Date("2022-11-13T23:59:59.999Z"),
	);

	await userEvent.click(screen.getByTestId("CloseIcon"));
	expect(modal).not.toBeVisible();
});
