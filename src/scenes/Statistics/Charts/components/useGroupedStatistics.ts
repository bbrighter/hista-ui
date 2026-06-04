import { useMemo } from "react";

import { useSymptomStatisticsWithNames } from "../../../../store";
import useHista from "../../../../store/store";

const useGroupedStatistics = (severityFilter: Array<number>) => {
	const statistics = useSymptomStatisticsWithNames();

	type Stats = typeof statistics;
	type Stat = Stats[number];

	const results = statistics.reduce<Map<number, Stat>>((acc, curr) => {
		const { symptomId, within1hour, within24hours, within72hours, severity } =
			curr;

		const isInFilter =
			severity >= severityFilter[0] && severity <= severityFilter[1];

		if (!isInFilter) return acc;

		const existing = acc.get(symptomId);
		acc.set(symptomId, {
			...curr,
			within1hour: Math.max(existing?.within1hour ?? 0, within1hour),
			within24hours: Math.max(existing?.within24hours ?? 0, within24hours),
			within72hours: Math.max(existing?.within72hours ?? 0, within72hours),
		});
		return acc;
	}, new Map());
	return Array.from(results.values());
};

export const useBarChartStatistics = (severityFilter: Array<number>) => {
	const statistics = useGroupedStatistics(severityFilter);
	const mealCount = useHista((state) => state.mealCount);

	return useMemo(
		() =>
			statistics.map((s) => ({
				x: s.symptomName,
				total: mealCount - s.within72hours - s.within24hours - s.within1hour,
				hours72: s.within72hours,
				hours24: s.within24hours,
				hours1: s.within1hour,
			})),
		[statistics, mealCount],
	);
};
