import { client } from "../../api/api";
import useHista from "../store";
import { respToIntakeList, respToMedicineList } from "../types/medicines.types";

export const medicinesService = {
  getMedicines: async () => {
    const { isMedicinesLoaded, setMedicines, setIsMedicinesLoaded } = useHista.getState()
    if (isMedicinesLoaded) return

    const resp = await client.ListMedicines()

    setMedicines(respToMedicineList(resp))
    setIsMedicinesLoaded(true)
  },

  createMedicine: async (name: string) => {
    const idResp = await client.CreateMedicine({ name: name });

    const { medicines, setMedicines } = useHista.getState();
    setMedicines([
      { id: idResp.id, isArchived: false, name: name },
      ...medicines,
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

  reorderMedicine: async (id: number,  prevId?: number, nextId?: number) => {
    const { medicines, changeOrder } = useHista.getState()

    await client.ReorderMedicine(id, { nextId: nextId, previousId: prevId })
    let targetIndex: number
    if (!nextId) {
      targetIndex = medicines.length
    }else  if (!prevId) {
      targetIndex = 0
    } else {
      targetIndex = medicines.findIndex(m => m.id == nextId)
    }
    changeOrder(id, targetIndex)
  },

  listIntakes: async () => {
    const { setIntakes, isIntakesLoaded , setIsIntakesLoaded } = useHista.getState()
    if (isIntakesLoaded) return
    const resp = await client.ListIntakes();

    setIntakes(respToIntakeList(resp));
    setIsIntakesLoaded(true)
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
