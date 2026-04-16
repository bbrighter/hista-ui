import { beforeEach, describe, expect, it, vi } from "vitest";

import { client } from "../../../api/api";
import useHista from "../../store";
import { medicinesService } from "../medicines.service";

describe("medicines service, manage medicines", () => {
  const spyPatch = vi.spyOn(client, "PatchMedicine");
  const spyListMeds = vi.spyOn(client, "ListMedicines")

  beforeEach(async () => {
    const { setMedicines } = useHista.getState();
    setMedicines([{ id: 1, isArchived: false, name: "Medicine" }]);
  });

  it("list medicines", async () => {
    await medicinesService.getMedicines();
    const { medicines, loaded } = useHista.getState();
    expect(medicines).toHaveLength(2)
    expect(loaded["medicines"]).toBeTruthy()
    expect(medicines).toContainEqual({
      id: 1,
      isArchived: false,
      name: "Medicine",
    });
    expect(medicines).toContainEqual({
      id: 2,
      isArchived: true,
      name: "Archived medicine",
    });
  });

  it("list medicines only called once", async () => {
    await medicinesService.getMedicines()
    await medicinesService.getMedicines()

    expect(spyListMeds).toHaveBeenCalledOnce()
  })

  it("create medicine", async () => {
    await medicinesService.createMedicine("new medicine");

    const { medicines } = useHista.getState();
    expect(medicines).toHaveLength(2);
    expect(medicines).toContainEqual({
      id: 3,
      isArchived: false,
      name: "new medicine",
    });
    expect(medicines[0].id).toBe(3)
  });

  describe("reorder medicine", () => {
    beforeEach(() => {
      const { setMedicines } = useHista.getState();
      setMedicines([
        { id: 1, isArchived: false, name: "Medicine 1" },
        { id: 2, isArchived: false, name: "Medicine 2" },
        { id: 3, isArchived: false, name: "Medicine 3" },
      ]);
    })
    it("reorder to first", async () => {
      await medicinesService.reorderMedicine(2, undefined, 1)

      const { medicines } = useHista.getState();
      expect(medicines[0].id).toBe(2)
      expect(medicines[1].id).toBe(1)
      expect(medicines[2].id).toBe(3)
    })
    it("reorder to last", async () => {
      await medicinesService.reorderMedicine(2, 3)

      const { medicines } = useHista.getState();
      expect(medicines[0].id).toBe(1)
      expect(medicines[1].id).toBe(3)
      expect(medicines[2].id).toBe(2)
    })
    it("reorder", async () => {
      await medicinesService.reorderMedicine(1, 2, 3)

      const { medicines } = useHista.getState();
      expect(medicines[0].id).toBe(2)
      expect(medicines[1].id).toBe(1)
      expect(medicines[2].id).toBe(3)
    })
    it("reorder with no effect", async () => {
      await medicinesService.reorderMedicine(2, 1, 3)

      const { medicines } = useHista.getState();
      expect(medicines[0].id).toBe(1)
      expect(medicines[1].id).toBe(2)
      expect(medicines[2].id).toBe(3)
    })
  })


  it("archive medicine", async () => {
    await medicinesService.archiveMedicine(1);
    expect(spyPatch).toHaveBeenCalledWith(
      "7b3047c2-d56d-4942-abc4-39eb85e785f2",
      1,
      { archive: true },
    );

    const { medicines } = useHista.getState();
    expect(medicines.find((i) => i.id == 1)!.isArchived).toBeTruthy();
  });

  it("rename medicine", async () => {
    await medicinesService.renameMedicine(1, "new name");
    expect(spyPatch).toHaveBeenCalledWith(
      "7b3047c2-d56d-4942-abc4-39eb85e785f2",
      1,
      { name: "new name" },
    );

    const { medicines } = useHista.getState();
    expect(medicines.find((i) => i.id == 1)!.name).toBe("new name");
  });
})

describe("medicines service, edit intakes", () => {
  const sypListIntakes = vi.spyOn(client, "ListIntakes")

  it("List intakes", async () => {
    await medicinesService.listIntakes();

    const { intakes } = useHista.getState();
    expect(intakes).toHaveLength(3);
  });

  it("List intakes is called only once", async () => {
    await medicinesService.listIntakes();
    await medicinesService.listIntakes();

    expect(sypListIntakes).toHaveBeenCalledOnce()  
  })

  it("Increment intake", async () => {
    const { setIntakes } = useHista.getState();
    const now = new Date();
    const oldDate = new Date("2025-06-06T00:00:00Z");
    setIntakes([
      { medicineId: 1, count: 3, date: now },
      { medicineId: 1, count: 1, date: oldDate },
    ]);

    await medicinesService.incrementIntake(1);

    const { intakes } = useHista.getState();
    expect(intakes).toContainEqual({ medicineId: 1, count: 4, date: now });
    expect(intakes).toContainEqual({ medicineId: 1, count: 1, date: oldDate });
  });

  it("Increment, but no intake exists before", async () => {
    vi.useFakeTimers()
    const fixedDate = new Date()
    vi.setSystemTime(fixedDate)
    
    const { setIntakes } = useHista.getState()
    const oldDate = new Date("2025-06-06T00:00:00Z");
    setIntakes([
      { medicineId: 1, count: 10, date: oldDate },
    ]);

    await medicinesService.incrementIntake(1)
    
    const { intakes } = useHista.getState()
    expect(intakes).toContainEqual({ medicineId: 1, count:1, date: fixedDate })
    vi.useRealTimers()
  })

  it("Decrement intake", async () => {
    const { setIntakes } = useHista.getState();
    const now = new Date();
    const oldDate = new Date("2025-06-06T00:00:00Z");
    setIntakes([
      { medicineId: 1, count: 3, date: now },
      { medicineId: 1, count: 1, date: oldDate },
    ]);

    await medicinesService.decrementIntake(1);

    const { intakes } = useHista.getState();
    expect(intakes).toContainEqual({ medicineId: 1, count: 2, date: now });
    expect(intakes).toContainEqual({ medicineId: 1, count: 1, date: oldDate });
  });
});

