import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

import useHista from "../../store";
import { useSymptomStatisticsWithNames } from "../statistics.selectors";

test("useSymptomStatisticsWithNames", () => {
	const { setSymptoms, setSymptomStatistics } = useHista.getState();
	setSymptoms([
		{
			categoryId: 1,
			categoryName: "cat",
			symptoms: [
				{ id: 1, categoryId: 1, name: "Name 1" },
				{ id: 2, categoryId: 1, name: "Name 2" },
			],
		},
	]);
	setSymptomStatistics([
		{
			symptomId: 1,
			severity: 1,
			within1hour: 1,
			within24hours: 1,
			within72hours: 1,
		},
	]);

	const { result } = renderHook(() => useSymptomStatisticsWithNames());
	expect(result.current).toHaveLength(1);
	expect(result.current[0].symptomName).toBe("Name 1");
});
