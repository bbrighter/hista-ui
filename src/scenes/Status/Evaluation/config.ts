import { t } from "@lingui/core/macro";

export const SERIES_CONFIG = [
	{ key: "morningFitness", color: "rgb(240, 205, 64)", label: t`Morgens` },
	{ key: "eveningFitness", color: "rgb(218, 80, 0)", label: t`Abends` },
	{ key: "morningSleep", color: "rgb(63, 0, 211)", label: t`Schlaf` },
] as const;

export type StatusMetricKey = (typeof SERIES_CONFIG)[number]["key"];

export type ActiveEntries = Record<StatusMetricKey, boolean>;
