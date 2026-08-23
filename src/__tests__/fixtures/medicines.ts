import type { hista } from "@/api/generatedApi";

const defaultMedicine = {
	id: 1,
	isArchived: false,
	name: "Medicine",
	sortOrder: 1,
} satisfies hista.MedicineResponse;

const defaultIntake = {
	medicineId: 1,
	count: 4,
	date: "2025-06-06T00:00:00Z",
} satisfies hista.IntakeResponse;

const createMedicine = (
	resp: Partial<hista.MedicineResponse>,
): hista.MedicineResponse => ({ ...defaultMedicine, ...resp });

export const createMedicineList = (
	resp: Array<hista.MedicineResponse> | Partial<hista.MedicineResponse> = {},
): hista.MedicineListResponse => ({
	medicines: Array.isArray(resp) ? resp : [createMedicine(resp)],
});

export const createIntakeList = (
	resp: Array<hista.IntakeResponse> | Partial<hista.IntakeResponse> = {},
): hista.IntakeListResponse => ({
	intakes: Array.isArray(resp) ? resp : [{ ...defaultIntake, ...resp }],
});
