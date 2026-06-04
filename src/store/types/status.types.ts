import type { Dayjs } from "dayjs";

export type Status = {
	id: number;
	date: Dayjs;
	morningFitness: number | null;
	morningSleep: number | null;
	eveningFitness: number | null;
	locked?: boolean;
};

export type PutStatusParams = {
	statusId: number;
	date: Dayjs;
	morningFitness?: number;
	morningSleep?: number;
	eveningFitness?: number;
};
