import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FoodList } from "./FoodList";
import type { FoodListProps } from "./useFoodList";

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

	beforeEach(() => {
		vi.resetAllMocks();
	});

	const getListItemByName = (name: string): HTMLElement => {
		const listItems = screen.queryAllByRole("listitem");
		const item = listItems.find((li) => li.contains(screen.getByText(name)));
		expect(item).toBeDefined();
		return item as HTMLElement;
	};

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

		const listItem1 = getListItemByName("ing");
		expect(
			within(listItem1).getByRole("button", { name: "Roh" }),
		).toBeVisible();
		expect(within(listItem1).queryByRole("button", { name: "Gar" })).toBeNull();
		expect(within(listItem1).getByRole("spinbutton")).toHaveValue(null);

		const listItem2 = getListItemByName("cooked ing");
		expect(
			within(listItem2).getByRole("button", { name: "Gar" }),
		).toBeVisible();
		expect(within(listItem2).queryByRole("button", { name: "Roh" })).toBeNull();
		expect(within(listItem2).getByRole("spinbutton")).toHaveValue(30);
	});

	it("Toggle raw/cooked", async () => {
		renderList({});

		const rawButton = screen.getByRole("button", { name: "Roh" });
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
			const input = screen.getByRole("spinbutton");
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
			const input = screen.getByRole("spinbutton");
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
			const input = screen.getByRole("spinbutton");
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

		const deleteButton = screen.getByTestId("delete-food-button");
		await userEvent.click(deleteButton);

		expect(deleteFood).toHaveBeenCalledExactlyOnceWith(1);
	});
});
