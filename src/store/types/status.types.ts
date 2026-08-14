import type { Dayjs } from "dayjs";

export type Status = {
	id: number;
	date: Dayjs;
	morningFitness: number | null;
	morningSleep: number | null;
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
};

export type PutStatusParams = {
	statusId: number;
	date: Dayjs;
	morningFitness: number | null;
	morningSleep: number | null;
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
};
