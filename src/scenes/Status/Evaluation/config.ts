export const SERIES_CONFIG = [
	{ key: "morningFitness", color: "rgb(240, 205, 64)", label: "Morgens" },
	{ key: "eveningFitness", color: "rgb(218, 80, 0)", label: "Abends" },
	{ key: "morningSleep", color: "rgb(63, 0, 211)", label: "Schlaf" },
] as const;

export type StatusMetricKey = (typeof SERIES_CONFIG)[number]["key"];

export type ActiveEntries = Record<StatusMetricKey, boolean>;
