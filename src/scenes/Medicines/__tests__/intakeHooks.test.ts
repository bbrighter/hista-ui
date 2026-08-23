import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

import useHista from "../../../store/store";
import { useOldIntakes } from "../IntakeList/intakeHooks";

test("use old intakes", () => {
	const { setMedicines, setIntakes } = useHista.getState();
	setMedicines([
		{ id: 1, isArchived: false, name: "Name" },
		{ id: 2, isArchived: true, name: "Archived" },
	]);

	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	const theDayBeforeYesterday = new Date();
	theDayBeforeYesterday.setDate(today.getDate() - 2);

	setIntakes([
		{ medicineId: 1, date: yesterday, count: 10 },
		{ medicineId: 2, date: yesterday, count: 0 },
		{ medicineId: 1, date: theDayBeforeYesterday, count: 0 },
		{ medicineId: 2, date: theDayBeforeYesterday, count: 5 },
	]);

	const { result } = renderHook(() => useOldIntakes());
	const intakes = result.current;

	expect(intakes).toHaveLength(2);
	const yesterdayIntake = intakes[0];
	expect(yesterdayIntake.date.getDate()).toBe(yesterday.getDate());
	expect(yesterdayIntake.values).toHaveLength(1);
	expect(yesterdayIntake.values).toContainEqual({
		count: 10,
		medicineId: 1,
		name: "Name",
		archived: false,
	});
	const olderIntakes = intakes[1];
	expect(olderIntakes.date.getDate()).toBe(theDayBeforeYesterday.getDate());
	expect(olderIntakes.values).toHaveLength(2);
	expect(olderIntakes.values).toContainEqual({
		count: 0,
		medicineId: 1,
		name: "Name",
		archived: false,
	});
	expect(olderIntakes.values).toContainEqual({
		count: 5,
		medicineId: 2,
		name: "Archived",
		archived: true,
	});
});
