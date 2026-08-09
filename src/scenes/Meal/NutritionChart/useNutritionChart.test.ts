import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Freshness } from "@/store";
import useHista from "@/store/store";
import { useNutritionChart } from "./useNutritionChart";

describe("useNutritionChart", () => {
	const date1 = new Date("2022-04-13");
	const testMeal = {
		date: date1,
		foods: [],
		freshness: Freshness.fresh,
		id: 1,
		isAlone: true,
		stressLevel: 2,
	};

	const nutrition1 = {
		date: date1,
		nutrition: { carbohydrate: 10, fat: 5, fiber: 2, protein: 0 },
	};
	const nutrition2 = {
		date: new Date("2022-04-14"),
		nutrition: { carbohydrate: 0, fat: 0, fiber: 0, protein: 0 },
	};

	it("Meal found", () => {
		const { setNutritionStatistics, setMeal } = useHista.getState();
		setNutritionStatistics({
			interval: "1d",
			statistics: [nutrition1, nutrition2],
		});
		setMeal(testMeal);

		const { result } = renderHook(() => useNutritionChart());
		expect(result.current.nutrition).toStrictEqual(nutrition1.nutrition);
		expect(result.current.date.toISOString()).toEqual(date1.toISOString());
	});

	it("No meal found", () => {
		const { setNutritionStatistics, setMeal } = useHista.getState();
		setMeal({ ...testMeal, date: new Date("2025-01-01") });
		setNutritionStatistics({
			interval: "1d",
			statistics: [nutrition1, nutrition2],
		});

		const { result } = renderHook(() => useNutritionChart());
		expect(result.current.nutrition).toStrictEqual({
			carbohydrate: 0,
			fat: 0,
			fiber: 0,
			protein: 0,
		});
		expect(result.current.date.toISOString()).toEqual(
			new Date("2025-01-01").toISOString(),
		);
	});
});
