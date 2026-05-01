import { client } from "../api/api";
import { hista } from "../api/generatedApi";
import { Intake, Medicine } from "../store";
import useHista from "../store/store";

export const medicines = {
  list: async () => {
    const { loaded, setMedicines, setLoaded } = useHista.getState()
    if (loaded["medicines"]) return

    const resp = await client.ListMedicines()

    setMedicines(respToMedicineList(resp))
    setLoaded("medicines")
  },

  create: async (name: string) => {
    const idResp = await client.CreateMedicine({ name: name });

    const { addMedicine } = useHista.getState();
    addMedicine({ id: idResp.id, isArchived: false, name: name });
  },

  archive: async (id: number) => {
    const { medicines } = useHista.getState()
    const medicine = medicines.find(m => m.id == id)
    if (!medicine) return
    const newArchive = !medicine.isArchived
    await client.PatchMedicine(id, { archive: newArchive });

    const { updateMedicine } = useHista.getState();
    updateMedicine(id, { isArchived: newArchive });
  },

  rename: async (id: number, name: string) => {
    await client.PatchMedicine(id, { name: name });

    const { updateMedicine } = useHista.getState();
    updateMedicine(id, { name: name });
  },

  reorder: async (id: number,  prevId?: number, nextId?: number) => {
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
}

export const intakes = {
  list: async () => {
    const { setIntakes, loaded , setLoaded } = useHista.getState()
    if (loaded["intakes"]) return
    const resp = await client.ListIntakes();

    setIntakes(respToIntakeList(resp));
    setLoaded("intakes")
  },

  increment: async (medicineId: number) => {
    await client.IncrementIntake(medicineId);

    const { changeMedicineIntake } = useHista.getState();
    changeMedicineIntake(medicineId, new Date(), 1);
  },

  decrement: async (medicineId: number) => {
    await client.DecrementIntake(medicineId);

    const { changeMedicineIntake } = useHista.getState();
    changeMedicineIntake(medicineId, new Date(), -1);
  },
};


const respToMedicine = (resp: hista.MedicineResponse): Medicine => {
  return {
    id: resp.id,
    isArchived: resp.isArchived,
    name: resp.name,
  };
};

const respToMedicineList = (
  resp: hista.MedicineListResponse,
): Array<Medicine> => {
  return resp.medicines.sort((a,b) => a.sortOrder - b.sortOrder).map((m) => respToMedicine(m));
};


const respToIntake = (resp: hista.IntakeResponse): Intake => {
  return {
    count: resp.count,
    date: new Date(resp.date),
    medicineId: resp.medicineId,
  };
};

const respToIntakeList = (
  resp: hista.IntakeListResponse,
): Array<Intake> => {
  return resp.intakes.map((i) => respToIntake(i));
};
