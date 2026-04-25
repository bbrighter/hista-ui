import { hista } from "../../api/generatedApi";

export type Medicine = {
  id: number;
  name: string;
  isArchived: boolean;
};

const respToMedicine = (resp: hista.MedicineResponse): Medicine => {
  return {
    id: resp.id,
    isArchived: resp.isArchived,
    name: resp.name,
  };
};

export const respToMedicineList = (
  resp: hista.MedicineListResponse,
): Array<Medicine> => {
  return resp.medicines.sort((a,b) => a.sortOrder - b.sortOrder).map((m) => respToMedicine(m));
};

export type Intake = {
  date: Date;
  medicineId: number;
  count: number;
};

const respToIntake = (resp: hista.IntakeResponse): Intake => {
  return {
    count: resp.count,
    date: new Date(resp.date),
    medicineId: resp.medicineId,
  };
};

export const respToIntakeList = (
  resp: hista.IntakeListResponse,
): Array<Intake> => {
  return resp.intakes.map((i) => respToIntake(i));
};
