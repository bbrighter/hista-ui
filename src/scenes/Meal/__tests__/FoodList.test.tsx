import { act, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FoodList } from "../FoodList/FoodList";
import type { FoodListProps } from "../FoodList/useFoodList";
import {
	getAmountInput,
	getDeleteFoodButton,
	getFoodRow,
	queryCookedButton,
	queryRawButton,
} from "./selectors";

describe("FoodList component", () => {
	const patchAmount = vi.fn();
	const patchCondition = vi.fn();
	const deleteFood = vi.fn();

	const renderList = (others?: Partial<FoodListProps>) =>
		render(
			<FoodList
				foods={[
					{
						foodId: 1,
						condition: "raw",
						ingredientId: 1,
						ingredientName: "ing",
					},
				]}
				patchAmount={patchAmount}
				patchCondition={patchCondition}
				deleteFood={deleteFood}
				{...others}
			/>,
		);

	it("Renders", async () => {
		renderList({
			foods: [
				{
					foodId: 1,
					condition: "raw",
					ingredientId: 1,
					ingredientName: "ing",
				},
				{
					foodId: 2,
					condition: "cooked",
					ingredientId: 2,
					amount: 30,
					ingredientName: "cooked ing",
				},
			],
		});

		const listItem1 = getFoodRow("ing");
		expect(queryRawButton(listItem1)).toBeVisible();
		expect(queryCookedButton(listItem1)).toBeNull();
		expect(getAmountInput(listItem1)).toHaveValue(null);

		const listItem2 = getFoodRow("cooked ing");
		expect(queryCookedButton(listItem2)).toBeVisible();
		expect(queryRawButton(listItem2)).toBeNull();
		expect(getAmountInput(listItem2)).toHaveValue(30);
	});

	it("Toggle raw/cooked", async () => {
		renderList({});

		const rawButton = queryRawButton(getFoodRow("ing")) as HTMLElement;
		await userEvent.click(rawButton);
		expect(patchCondition).toHaveBeenCalledExactlyOnceWith(1, "cooked");
	});

	describe("Change amount", () => {
		afterEach(() => {
			vi.useRealTimers();
		});

		it("Change from null to number", async () => {
			const currMock = vi.fn().mockResolvedValue(undefined);
			vi.useFakeTimers();
			renderList({ patchAmount: currMock });
			const input = getAmountInput();
			expect(input).toHaveValue(null);

			act(() => fireEvent.change(input, { target: { value: 20 } }));

			expect(input).toHaveValue(20);
			expect(currMock).not.toHaveBeenCalled();

			await act(async () => vi.advanceTimersByTime(2500)); // Async to flush the timer in the useEffect
			expect(currMock).toHaveBeenCalledExactlyOnceWith(1, 20);
		});
		it.skip("Change from number to null", async () => {
			// Does this test make sense?
			const currMock = vi.fn().mockResolvedValue(undefined);
			vi.useFakeTimers();
			renderList({
				patchAmount: currMock,
				foods: [
					{
						condition: "raw",
						foodId: 1,
						ingredientId: 1,
						ingredientName: "",
						amount: 10,
					},
				],
			});
			const input = getAmountInput();
			expect(input).toHaveValue(10);

			act(() => fireEvent.change(input, { target: { value: 0 } }));

			expect(input).toHaveValue(0);
			expect(currMock).not.toHaveBeenCalled();

			await act(async () => vi.advanceTimersByTime(2500)); // Async to flush the timer in the useEffect
			expect(currMock).toHaveBeenCalledExactlyOnceWith(1, 0);
		});
		it("Change from number to number", async () => {
			const currMock = vi.fn().mockResolvedValue(undefined);
			vi.useFakeTimers();
			renderList({
				patchAmount: currMock,
				foods: [
					{
						condition: "raw",
						foodId: 1,
						ingredientId: 1,
						ingredientName: "",
						amount: 10,
					},
				],
			});
			const input = getAmountInput();
			expect(input).toHaveValue(10);

			act(() => fireEvent.change(input, { target: { value: 20 } }));

			expect(input).toHaveValue(20);
			expect(currMock).not.toHaveBeenCalled();

			await act(async () => vi.advanceTimersByTime(2500)); // Async to flush the timer in the useEffect
			expect(currMock).toHaveBeenCalledExactlyOnceWith(1, 20);
		});
	});

	it("delete item", async () => {
		renderList();

		const deleteButton = getDeleteFoodButton();
		await userEvent.click(deleteButton);

		expect(deleteFood).toHaveBeenCalledExactlyOnceWith(1);
	});
});
