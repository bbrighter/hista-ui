import type { Dayjs } from "dayjs";

export type Status = {
	id: number;
	date: Dayjs;
	morningFitness: number | null;
	morningSleep: number | null;
	dayFitness: number | null;
	eveningFitness: number | null;
	depressive: number | null;
	tense: number | null;
	moodSwings: number | null;
	irritable: number | null;
	lossOfInterest: number | null;
	concentrationProblems: number | null;
	lackOfDrive: number | null;
	appetiteChanges: number | null;
	sleepProblems: number | null;
	overwhelmed: number | null;
	crash: boolean;
};

export type PutStatusParams = {
	date: Dayjs;
	morningFitness: number | null;
	morningSleep: number | null;
	dayFitness: number | null;
	eveningFitness: number | null;
	depressive: number | null;
	tense: number | null;
	moodSwings: number | null;
	irritable: number | null;
	lossOfInterest: number | null;
	concentrationProblems: number | null;
	lackOfDrive: number | null;
	appetiteChanges: number | null;
	sleepProblems: number | null;
	overwhelmed: number | null;
	crash: boolean;
};
