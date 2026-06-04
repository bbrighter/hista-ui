import { expect, test } from "vitest";

import useHista from "../../store/store";
import { actions } from "..";

test("get meal statistics", async () => {
	await actions.statistics.getMealStatistics(new Date(), new Date(), 1);

	const { statistics, mealCount } = useHista.getState();
	expect(mealCount).toBe(5);
	expect(statistics).toHaveLength(3);
	expect(statistics).toContainEqual({
		symptomId: 1,
		severity: 1,
		within1hour: 1,
		within24hours: 1,
		within72hours: 0,
	});
	expect(statistics).toContainEqual({
		symptomId: 1,
		severity: 2,
		within1hour: 0,
		within24hours: 1,
		within72hours: 0,
	});
	expect(statistics).toContainEqual({
		symptomId: 2,
		severity: 1,
		within1hour: 0,
		within24hours: 1,
		within72hours: 4,
	});
});

test("get diaries", async () => {
	await actions.statistics.getDiaries();

	const { diaryEntries } = useHista.getState();
	expect(diaryEntries).toHaveLength(4);
	expect(diaryEntries).toContainEqual({
		Date: new Date("2026-02-14T16:52:46.908836+01:00"),
		Type: "Pollen",
		What: "",
		Severity: "Geringe",
		Category: "Hasel",
	});
	expect(diaryEntries).toContainEqual({
		Date: new Date("2026-02-14T09:55:12.830294+01:00"),
		Type: "Symptom",
		What: "Kopfweh",
		Severity: "0",
		Category: "Kopf",
	});
	expect(diaryEntries).toContainEqual({
		Date: new Date("2026-02-14T09:54:55.232+01:00"),
		Type: "Essen",
		What: "Zucchini",
		Severity: "Gar",
		Category: "",
	});
	expect(diaryEntries).toContainEqual({
		Date: new Date("2025-12-20T09:36:03.139833+01:00"),
		Type: "Notiz",
		What: "Notizi",
		Severity: "",
		Category: "",
	});
});

test("get nutrition stats", async () => {
	await actions.statistics.getNutritionStatistics("day");

	const { nutritionStatistics } = useHista.getState();
	expect(nutritionStatistics.statistics).toHaveLength(2);
	expect(nutritionStatistics.interval).toBe("day");
	const stat0 = nutritionStatistics.statistics[0];
	expect(stat0.date.getDate()).toBe(14);
	expect(stat0.nutrition).toStrictEqual({
		carbohydrate: 10,
		fat: 25,
		fiber: 5.2,
		protein: 0,
	});
});
