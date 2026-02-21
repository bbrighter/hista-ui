import { entity } from "../../api/generatedApi";

export type Medicine = {
  id: number;
  name: string;
  isArchived: boolean;
};

const respToMedicine = (resp: entity.MedicineResponse): Medicine => {
  return {
    id: resp.id,
    isArchived: resp.isArchived,
    name: resp.name,
  };
};

export const respToMedicineList = (
  resp: entity.MedicineListResponse,
): Array<Medicine> => {
  return resp.medicines.map((m) => respToMedicine(m));
};

export type Intake = {
  date: Date;
  medicineId: number;
  count: number;
};

const respToIntake = (resp: entity.IntakeResponse): Intake => {
  return {
    count: resp.count,
    date: new Date(resp.date),
    medicineId: resp.medicineId,
  };
};

export const respToIntakeList = (
  resp: entity.IntakeResponseList,
): Array<Intake> => {
  return resp.intakes.map((i) => respToIntake(i));
};
