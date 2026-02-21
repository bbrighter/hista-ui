import { beforeEach, describe, expect, it, vi } from "vitest";

import { client } from "../../../api/api";
import useHista from "../../store";
import { medicinesService } from "../medicines.service";

describe("medicines service", () => {
  const spyPatch = vi.spyOn(client, "PatchMedicine");

  beforeEach(async () => {
    vi.resetAllMocks();
    const { setMedicines } = useHista.getState();
    setMedicines([{ id: 1, isArchived: false, name: "Medicine" }]);
  });

  it("getMedicines", async () => {
    await medicinesService.getMedicines();
    const { medicines } = useHista.getState();
    expect(medicines).toHaveLength(2);
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

  it("create medicine", async () => {
    await medicinesService.createMedicine("new medicine");

    const { medicines } = useHista.getState();
    expect(medicines).toHaveLength(2);
    expect(medicines).toContainEqual({
      id: 3,
      isArchived: false,
      name: "new medicine",
    });
  });

  it("archive medicine", async () => {
    await medicinesService.archiveMedicine(1);
    expect(spyPatch).toHaveBeenCalledWith(
      "7b3047c2-d56d-4942-abc4-39eb85e785f2",
      1,
      { archive: true },
    );

    const { medicines } = useHista.getState();
    expect(medicines.find((i) => i.id == 1).isArchived).toBeTruthy();
  });

  it("rename medicine", async () => {
    await medicinesService.renameMedicine(1, "new name");
    expect(spyPatch).toHaveBeenCalledWith(
      "7b3047c2-d56d-4942-abc4-39eb85e785f2",
      1,
      { name: "new name" },
    );

    const { medicines } = useHista.getState();
    expect(medicines.find((i) => i.id == 1).name).toBe("new name");
  });

  it("List intakes", async () => {
    await medicinesService.listIntakes();

    const { intakes } = useHista.getState();
    expect(intakes).toHaveLength(3);
  });

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
