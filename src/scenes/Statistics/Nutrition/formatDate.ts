import { t } from "@lingui/core/macro";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);
dayjs.extend(isoWeek);

export const formatDateBasedOnInterval = (
	date: Date,
	interval: "day" | "week" | "month" | "quarter",
) => {
	const dayDate = dayjs(date);
	switch (interval) {
		case "day":
			return date.toLocaleDateString("de-DE");
		case "week":
			return t`Woche ${dayDate.isoWeek()}`;
		case "quarter":
			return t`Q${dayDate.quarter()} ${dayDate.year()}`;
		case "month":
			return dayDate.format("MMMM YYYY"); // e.g., "März 2026"
	}
};
