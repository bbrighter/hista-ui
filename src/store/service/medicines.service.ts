import { client } from "../../api/api";
import useHista from "../store";
import { respToIntakeList, respToMedicineList } from "../types/medicines.types";

export const medicinesService = {
  getMedicines: async () => {
    const { loaded, setMedicines, setLoaded } = useHista.getState()
    if (loaded["medicines"]) return

    const resp = await client.ListMedicines()

    setMedicines(respToMedicineList(resp))
    setLoaded("medicines")
  },

  createMedicine: async (name: string) => {
    const idResp = await client.CreateMedicine({ name: name });

    const { addMedicine } = useHista.getState();
    addMedicine({ id: idResp.id, isArchived: false, name: name });
  },

  archiveMedicine: async (id: number) => {
    const { medicines } = useHista.getState()
    const medicine = medicines.find(m => m.id == id)
    if (!medicine) return
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
    const { setIntakes, loaded , setLoaded } = useHista.getState()
    if (loaded["intakes"]) return
    const resp = await client.ListIntakes();

    setIntakes(respToIntakeList(resp));
    setLoaded("intakes")
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
