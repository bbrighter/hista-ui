import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import useHista from "../../../../store/store";
import { useBarChartStatistics } from "../components/useGroupedStatistics";

describe("useBarChartStatistics", () => {
	beforeEach(() => {
		const { setSymptomStatistics, setSymptoms, setMealCount } =
			useHista.getState();
		setSymptoms([
			{
				categoryId: 1,
				categoryName: "cat",
				symptoms: [
					{ id: 1, categoryId: 1, name: "name1" },
					{ id: 2, categoryId: 1, name: "name2" },
				],
			},
		]);
		setSymptomStatistics([
			{
				severity: 1,
				symptomId: 1,
				within1hour: 2,
				within24hours: 2,
				within72hours: 1,
			},
			{
				severity: 3,
				symptomId: 1,
				within1hour: 0,
				within24hours: 1,
				within72hours: 1,
			},
			{
				severity: 1,
				symptomId: 2,
				within1hour: 0,
				within24hours: 1,
				within72hours: 1,
			},
		]);
		setMealCount(5);
	});
	it("ok", () => {
		const { result } = renderHook(() => useBarChartStatistics([1, 5]));
		const stats = result.current;

		expect(stats).toHaveLength(2);
		expect(stats).toContainEqual({
			x: "name1",
			total: 0,
			hours1: 2,
			hours24: 2,
			hours72: 1,
		});
		expect(stats).toContainEqual({
			x: "name2",
			total: 3,
			hours1: 0,
			hours24: 1,
			hours72: 1,
		});
	});

	it("filter values", () => {
		const { result } = renderHook(() => useBarChartStatistics([3, 5]));
		const stats = result.current;

		expect(stats).toHaveLength(1);
		expect(stats).toContainEqual({
			x: "name1",
			total: 3,
			hours1: 0,
			hours24: 1,
			hours72: 1,
		});
	});
});
