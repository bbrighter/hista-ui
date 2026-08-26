import { expect, test } from "vitest";
import { createDiaries } from "@/__tests__/fixtures/statistics";
import { getDiariesHandler } from "@/__tests__/mocks/statisticsHandler";
import { server } from "@/__tests__/setupTest";
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
	server.use(
		getDiariesHandler([
			{
				date: "2026-02-14T16:52:46Z",
				type: "Pollen",
				content: "",
				severity: "Geringe",
				category: "Hasel",
			},
			{
				date: "2026-02-14T09:55:12Z",
				type: "Symptom",
				content: "Kopfweh",
				severity: "0",
				category: "Kopf",
			},
			{
				date: "2026-02-14T09:54:55Z",
				type: "Food",
				content: "Zucchini",
				severity: "cooked",
				category: "",
			},
			{
				date: "2025-12-20T09:36:03Z",
				type: "Note",
				content: "Notizi",
				severity: "",
				category: "",
			},
		]),
	);
	await actions.statistics.getDiaries();

	const { diaryEntries } = useHista.getState();
	expect(diaryEntries).toHaveLength(4);
	expect(diaryEntries).toContainEqual({
		Date: new Date("2026-02-14T16:52:46Z"),
		Type: "Pollen",
		What: "",
		Severity: "Geringe",
		Category: "Hasel",
	});
	expect(diaryEntries).toContainEqual({
		Date: new Date("2026-02-14T09:55:12Z"),
		Type: "Symptom",
		What: "Kopfweh",
		Severity: "0",
		Category: "Kopf",
	});
	expect(diaryEntries).toContainEqual({
		Date: new Date("2026-02-14T09:54:55Z"),
		Type: "Essen",
		What: "Zucchini",
		Severity: "Gar",
		Category: "",
	});
	expect(diaryEntries).toContainEqual({
		Date: new Date("2025-12-20T09:36:03Z"),
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
