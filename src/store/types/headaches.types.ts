export interface Headache {
	id: number;
	date: Date;
	severity: number;
	positions: HeadachePositions;
	types: HeadacheTypes;
	symptoms: HeadacheSymptoms;
	description: string;
}

interface ValueLabelPair {
	value: string;
	label: string;
}

export type HeadachePositions = Array<ValueLabelPair>;

export const validHeadachePositions: HeadachePositions = [
	{ value: "left", label: "Links" },
	{ value: "right", label: "Rechts" },
	{ value: "top", label: "Oben" },
	{ value: "front top", label: "Vorne" },
	{ value: "back", label: "Hinterkopf" },
	{ value: "side", label: "Seite" },
	{ value: "temple", label: "Schläfe" },
	{ value: "front", label: "Stirn" },
	{ value: "ear", label: "Ohr" },
	{ value: "neck", label: "Nacken" },
	{ value: "eye", label: "Auge" },
	{ value: "face", label: "Gesicht" },
];

export type HeadacheTypes = Array<ValueLabelPair>;

export const validHeadacheTypes: HeadacheTypes = [
	{ value: "pulsating-pounding", label: "Pulsierend-pochend" },
	{ value: "dull-pressing", label: "Dumpf-drückend" },
	{ value: "stabbing", label: "Stechend" },
];

export type HeadacheSymptoms = Array<ValueLabelPair>;

export const validHeadacheSymptoms: HeadacheSymptoms = [
	{ value: "short-term memory", label: "Kurzzeitgedächtnis" },
	{ value: "tinnitus", label: "Tinnitus" },
	{ value: "light-sensitive", label: "Lichtempfindlichkeit" },
	{ value: "noise-sensitive", label: "Lärmempfindlichkeit" },
	{ value: "odor-sensitive", label: "Geruchsempfindlichkeit" },
	{ value: "dizziness", label: "Schwindel" },
	{ value: "lack of concentration", label: "Konzentrationsstörung" },
	{ value: "tired", label: "Müdigkeit" },
	{ value: "exhausted", label: "Erschöpfung" },
	{ value: "nausea", label: "Übelkeit" },
	{ value: "no physical activity", label: "Keine körperliche Aktivität" },
	{
		value: "physical activity",
		label: "Verstärkt durch körperliche Aktivität",
	},
	{ value: "mind activity", label: "Verstärkt durch geistige Aktivität" },
];
