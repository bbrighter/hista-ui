import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useHista from "@/store/store";
import { useMealList } from "../MealList/MealList";

const mocks = vi.hoisted(() => ({
	navigate: {
		to: {
			mealDetail: vi.fn(),
		},
	},
	actions: {
		meals: {
			delete: vi.fn(),
			patchDate: vi.fn(),
			list: vi.fn(),
		},
	},
}));

vi.mock("@/hooks/useNavigate", () => ({
	useAppNavigate: () => mocks.navigate,
}));

vi.mock("@/actions", () => ({
	actions: mocks.actions,
}));

describe("useMealList", () => {
	it("onClick navigates", () => {
		const { result } = renderHook(() => useMealList());

		result.current.onClick(42);

		expect(mocks.navigate.to.mealDetail).toHaveBeenCalledExactlyOnceWith(42);
	});

	it("Meals", () => {
		useHista.getState().setMeals([{ id: 1, date: new Date() }]);
		const { result } = renderHook(() => useMealList());

		expect(result.current.meals).toHaveLength(1);
		expect(result.current.meals[0].id).toBe(1);
	});

	it("onDelete deletes", () => {
		const { result } = renderHook(() => useMealList());

		result.current.onDelete(42);
		expect(mocks.actions.meals.delete).toHaveBeenCalledExactlyOnceWith(42);
	});

	it("onSetNow changes the date correctly", () => {
		vi.setSystemTime("2024-10-30");
		const { result } = renderHook(() => useMealList());

		result.current.onSetNow(42);
		expect(mocks.actions.meals.patchDate).toHaveBeenCalledExactlyOnceWith(
			42,
			"2024-10-30T00:00:00.000Z",
		);
	});

	it("getMeals", () => {
		const { result } = renderHook(() => useMealList());

		result.current.getMeals();
		expect(mocks.actions.meals.list).toHaveBeenCalled();
	});
});
