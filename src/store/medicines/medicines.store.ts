import { StateCreator } from "zustand";

import { MedicineStore, NonFunctionProperties, StoreType } from "../store.type";
import { Intake, Medicine } from "../types/medicines.types";

type State = NonFunctionProperties<MedicineStore>

const initialState = (): State => ({
  medicines: [],
  intakes: [],
});

export const createMedicineSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  MedicineStore
> = (set) => ({
  ...initialState(),

  resetMedicines: () => {
    set(initialState());
  },

  setMedicines: (medicines: Array<Medicine>) => {
    set(state => {
      state.medicines = medicines;
    });
  },

  addMedicine: (medicine: Medicine) => {set(state => {
    state.medicines.unshift(medicine)
  })},

  updateMedicine: (id: number, partial: Partial<Medicine>) => {
    set(state => {
      const medicine = state.medicines.find((m) => m.id === id);
      if (!medicine) return;
      Object.assign(medicine, partial);
    });
  },
  changeOrder(id: number, targetIndex: number) {
    set(state => {
      const medicineIndex = state.medicines.findIndex(m => m.id == id)
      const [medicine] = state.medicines.splice(medicineIndex, 1)
      const adjustedIndex = medicineIndex < targetIndex ? targetIndex - 1 : targetIndex
      state.medicines.splice(adjustedIndex, 0, medicine)
    })
      
  },
  setIntakes: (intakes: Array<Intake>) => {
    set(state => {
      state.intakes = intakes;
    });
  },
  changeMedicineIntake: (id, date, value) => {
    set(state => {
      const intake = state.intakes.find(
        (i) =>
          i.medicineId == id &&
          i.date.getFullYear() == date.getFullYear() &&
          i.date.getMonth() == date.getMonth() &&
          i.date.getDate() == date.getDate(),
      );
      if (intake) {
        intake.count = intake.count + value
      } else {
        state.intakes.push({ medicineId: id, date: date, count: value })
      }
    });
  },
});
