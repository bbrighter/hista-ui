import { describe, expect, it } from "vitest";

import { MedicineState } from "../store.type";
import { selectNonArchivedMedicines } from "./selectors";

describe("selectors", () => {
  it("selectNonArchivedMedicines", () => {
    const state = { medicines: [
      { id: 1, isArchived: false, name: "Medicine" },
      { id: 2, isArchived: true, name: "Archived" },
    ] } satisfies MedicineState

    const meds = selectNonArchivedMedicines(state)
    
    expect(meds).toHaveLength(1)
    expect(meds[0].id).toBe(1)
    expect(meds[0].name).toBe("Medicine")
  })
})