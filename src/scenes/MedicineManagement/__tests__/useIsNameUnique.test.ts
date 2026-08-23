import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

import useHista from "../../../store/store";
import { useIsNameUnique } from "../MedicineList/useIsNameUnique";

test("useIsNameUnique", () => {
	const { setMedicines } = useHista.getState();
	setMedicines([
		{ id: 1, isArchived: true, name: "name" },
		{ id: 2, isArchived: false, name: " name 2 " },
	]);
	const { result } = renderHook(() => useIsNameUnique());

	expect(result.current("name")).toBeFalsy();
	expect(result.current("name 2")).toBeFalsy();
	expect(result.current(" name ")).toBeFalsy();
	expect(result.current("different name")).toBeTruthy();
});
