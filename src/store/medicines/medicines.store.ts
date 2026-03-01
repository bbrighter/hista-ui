import { produce } from "immer";
import { StateCreator } from "zustand";

import { Intake, Medicine } from "../types/medicines.types";

type State = {
  medicines: Array<Medicine>;
  intakes: Array<Intake>;
};

interface Actions {
  resetMedicines: () => void;
  setMedicines: (medicines: Array<Medicine>) => void;
  updateMedicine: (id: number, medicine: Partial<Medicine>) => void;
  changeOrder: (id: number, targetIndex: number) => void;
  setIntakes: (intakes: Array<Intake>) => void;
  changeMedicineIntake: (id: number, date: Date, value: number) => void;
}

export interface MedicineStore extends State, Actions {}

const initialState = (): State => ({
  medicines: [],
  intakes: [],
});

export const createMedicineSlice: StateCreator<
  MedicineStore,
  [],
  [],
  MedicineStore
> = (set) => ({
  ...initialState(),

  resetMedicines: () => {
    set(initialState());
  },

  setMedicines: (medicines: Array<Medicine>) => {
    set(
      produce((draft: State) => {
        draft.medicines = medicines;
      }),
    );
  },
  updateMedicine: (id: number, partial: Partial<Medicine>) => {
    set(
      produce((draft: State) => {
        const medicine = draft.medicines.find((m) => m.id === id);
        if (!medicine) return;
        Object.assign(medicine, partial);
      }),
    );
  },
  changeOrder(id: number, targetIndex: number) {
    set(produce((draft: State) => {
      const medicineIndex = draft.medicines.findIndex(m => m.id == id)
      const [medicine] = draft.medicines.splice(medicineIndex, 1)
      const adjustedIndex = medicineIndex < targetIndex ? targetIndex - 1 : targetIndex
      draft.medicines.splice(adjustedIndex, 0, medicine)
    }))
      
  },
  setIntakes: (intakes: Array<Intake>) => {
    set(
      produce((draft: State) => {
        draft.intakes = intakes;
      }),
    );
  },
  changeMedicineIntake: (id, date, value) => {
    set(
      produce((draft: State) => {
        const intake = draft.intakes.find(
          (i) =>
            i.medicineId == id &&
            i.date.getFullYear() == date.getFullYear() &&
            i.date.getMonth() == date.getMonth() &&
            i.date.getDate() == date.getDate(),
        );
        if (intake) {
          intake.count = intake.count + value
        } else {
          draft.intakes.push({ medicineId: id, date: date, count: value })
        }
        
        
      }),
    );
  },
});
