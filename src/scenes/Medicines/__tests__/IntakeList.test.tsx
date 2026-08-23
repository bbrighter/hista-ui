import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IntakeList, type IntakeListProps } from "../IntakeList/IntakeList";
import {
	getBlockByDate,
	getDecreaseButton,
	getIncreaseButton,
	getIntakeRows,
} from "./selectors";

describe("IntakeList component", () => {
	const minus24H = (d: Date) => new Date(d.getTime() - 24 * 60 * 60 * 1000);
	const onIncrease = vi.fn();
	const onDecrease = vi.fn();

	afterEach(() => vi.useRealTimers());

	const renderIntakeList = (props: Partial<IntakeListProps> = {}) => {
		return render(
			<IntakeList
				onDecrease={onDecrease}
				onIncrease={onIncrease}
				oldIntakes={[]}
				todaysIntakes={[]}
				{...props}
			/>,
		);
	};

	it("Renders multiple intakes", async () => {
		vi.useFakeTimers();
		vi.setSystemTime("2026-08-23T13:03:00Z");
		const today = new Date();
		renderIntakeList({
			oldIntakes: [
				{
					date: minus24H(today),
					values: [
						{
							archived: false,
							count: 0,
							medicineId: 1,
							name: "Medicine",
						},
						{
							archived: true,
							count: 2,
							medicineId: 2,
							name: "Archived medicine",
						},
					],
				},
				{
					date: minus24H(minus24H(today)),
					values: [
						{
							archived: false,
							count: 5,
							medicineId: 1,
							name: "Medicine",
						},
					],
				},
			],
			todaysIntakes: [{ count: 1, medicineId: 1, name: "Medicine" }],
		});

		const todayBlock = getBlockByDate("Sonntag, 23.08.2026");
		const todayRows = getIntakeRows("Medicine", todayBlock);
		expect(todayRows).toHaveLength(1);
		expect(todayRows[0]).toHaveTextContent("1");
		getIncreaseButton(todayRows[0]);
		getDecreaseButton(todayRows[0]);

		const yesterdayBlock = getBlockByDate("Samstag, 22.08.2026");
		const yesterdayRows = getIntakeRows("Medicine", yesterdayBlock);
		expect(yesterdayRows).toHaveLength(1);
		expect(getIntakeRows("Archived medicine", yesterdayBlock)).toHaveLength(1);

		const yesterdayArchivedRows = getIntakeRows(
			"Archived medicine",
			yesterdayBlock,
		);
		expect(yesterdayArchivedRows).toHaveLength(1);

		const dayBeforeBlock = getBlockByDate("Freitag, 21.08.2026");
		const dayBeforeRows = getIntakeRows("Medicine", dayBeforeBlock);
		expect(dayBeforeRows).toHaveLength(1);

		// Only today has +- buttons
		expect(screen.getAllByRole("button", { name: "+" })).toHaveLength(1);
		expect(screen.getAllByRole("button", { name: "-" })).toHaveLength(1);
	});

	it("Click on increase button", async () => {
		renderIntakeList({
			todaysIntakes: [{ count: 1, medicineId: 1, name: "Medicine" }],
		});

		const increaseButton = getIncreaseButton();
		expect(increaseButton).toBeEnabled();
		await userEvent.click(increaseButton);
		expect(onIncrease).toHaveBeenCalledExactlyOnceWith(1);
	});

	it("Click on decrease button", async () => {
		renderIntakeList({
			todaysIntakes: [{ count: 1, medicineId: 1, name: "Medicine" }],
		});

		const decreaseButton = getDecreaseButton();
		expect(decreaseButton).toBeEnabled();
		await userEvent.click(decreaseButton);
		expect(onDecrease).toHaveBeenCalledExactlyOnceWith(1);
	});

	it("Decrease is disabled with count = 0", async () => {
		renderIntakeList({
			todaysIntakes: [{ count: 0, medicineId: 1, name: "Medicine" }],
		});

		const decreaseButton = getDecreaseButton();
		expect(decreaseButton).toBeDisabled();
	});
});
