import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import useHista from "../../../store/store";
import { useConditionsWithSymptoms } from "./hooks";

describe("useConditionsWithSymptoms", () => {
	beforeEach(() => {
		const { setSymptoms } = useHista.getState();
		setSymptoms([
			{
				categoryId: 1,
				categoryName: "Cat 1",
				symptoms: [
					{ categoryId: 1, id: 1, name: "Symptom 1" },
					{ categoryId: 1, id: 2, name: "Symptom 2" },
				],
			},
			{
				categoryId: 2,
				categoryName: "Cat 2",
				symptoms: [{ categoryId: 2, id: 3, name: "Symptom 3" }],
			},
		]);
	});

	it("ok", () => {
		const { setConditionEvent } = useHista.getState();
		setConditionEvent({
			id: 1,
			date: new Date(),
			conditions: [
				{ id: 1, severity: 3, symptomId: 1 },
				{ id: 2, severity: 1, symptomId: 3 },
			],
		});

		const { result } = renderHook(() => useConditionsWithSymptoms());

		expect(result.current).toHaveLength(2);
		expect(result.current).toContainEqual({
			catId: 1,
			catName: "Cat 1",
			symptomId: 1,
			symptomName: "Symptom 1",
			id: 1,
			severity: 3,
		});
		expect(result.current).toContainEqual({
			catId: 2,
			catName: "Cat 2",
			symptomId: 3,
			symptomName: "Symptom 3",
			id: 2,
			severity: 1,
		});
	});

	it("not found", () => {
		const { setConditionEvent } = useHista.getState();
		setConditionEvent({
			id: 1,
			date: new Date(),
			conditions: [
				{ id: 1, severity: 3, symptomId: 1 },
				{ id: 2, severity: 1, symptomId: 5 },
			],
		});

		const { result } = renderHook(() => useConditionsWithSymptoms());

		expect(result.current).toHaveLength(2);
		expect(result.current).toContainEqual({
			catId: 1,
			catName: "Cat 1",
			symptomId: 1,
			symptomName: "Symptom 1",
			id: 1,
			severity: 3,
		});
		expect(result.current).toContainEqual({ symptomId: 5, id: 2, severity: 1 });
	});
});
