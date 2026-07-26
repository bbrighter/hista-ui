import type { Dayjs } from "dayjs";

import useHista from "../store";

export const useStatus = () => {
	const statuses = useHista((state) => state.statuses);
	return [...statuses].sort((a, b) => b.date.diff(a.date));
};

export const useStatusExistsOnDay = (day: Dayjs) => {
	return useStatusExistsOnDays([day])[0];
};

export const useStatusExistsOnDays = (days: Array<Dayjs>) => {
	const statuses = useHista((state) => state.statuses);
	const isLoaded = useHista((state) => state.loaded);
	if (!isLoaded.statuses) return days.map((_) => true);
	return days.map((day) => statuses.some((s) => s.date.isSame(day, "day")));
};
