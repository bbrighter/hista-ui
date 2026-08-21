const SYMPTOM_FIELDS = [
	"morningSleep",
	"morningFitness",
	"dayFitness",
	"eveningFitness",
	"depressive",
	"tense",
	"moodSwings",
	"irritable",
	"lossOfInterest",
	"concentrationProblems",
	"lackOfDrive",
	"appetiteChanges",
	"sleepProblems",
	"overwhelmed",
] as const;

export type SymptomKey = (typeof SYMPTOM_FIELDS)[number];
