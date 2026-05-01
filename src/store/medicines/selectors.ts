import { MedicineState } from "../store.type";

export const selectNonArchivedMedicines = (s: MedicineState) => {
  return s.medicines.filter(m => !m.isArchived)
}
