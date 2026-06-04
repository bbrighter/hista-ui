export type Medicine = {
	id: number;
	name: string;
	isArchived: boolean;
};

export type Intake = {
	date: Date;
	medicineId: number;
	count: number;
};
