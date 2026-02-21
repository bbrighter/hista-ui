import { client } from "../../api/api";
import useHista from "../store";
import { respToIntakeList, respToMedicineList } from "../types/medicines.types";

export const medicinesService = {
  getMedicines: async () => {
    const resp = await client.ListMedicines();

    const { setMedicines } = useHista.getState();
    setMedicines(respToMedicineList(resp));
  },

  createMedicine: async (name: string) => {
    const idResp = await client.CreateMedicine({ name: name });

    const { medicines, setMedicines } = useHista.getState();
    setMedicines([
      ...medicines,
      { id: idResp.id, isArchived: false, name: name },
    ]);
  },

  archiveMedicine: async (id: number) => {
    const { medicines } = useHista.getState()
    const medicine = medicines.find(m => m.id == id)
    const newArchive = !medicine.isArchived
    await client.PatchMedicine(id, { archive: newArchive });

    const { updateMedicine } = useHista.getState();
    updateMedicine(id, { isArchived: newArchive });
  },

  renameMedicine: async (id: number, name: string) => {
    await client.PatchMedicine(id, { name: name });

    const { updateMedicine } = useHista.getState();
    updateMedicine(id, { name: name });
  },

  listIntakes: async () => {
    const resp = await client.ListIntakes();

    const { setIntakes } = useHista.getState();
    setIntakes(respToIntakeList(resp));
  },

  incrementIntake: async (medicineId: number) => {
    await client.IncrementIntake(medicineId);

    const { changeMedicineIntake } = useHista.getState();
    changeMedicineIntake(medicineId, new Date(), 1);
  },

  decrementIntake: async (medicineId: number) => {
    await client.DecrementIntake(medicineId);

    const { changeMedicineIntake } = useHista.getState();
    changeMedicineIntake(medicineId, new Date(), -1);
  },
};
