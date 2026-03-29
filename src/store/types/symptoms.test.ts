import { describe, expect, it } from "vitest"

import { entity } from "../../api/generatedApi"
import { respToSymptoms } from "./symptom.types"


describe("symptom", () => {
  const resp: entity.SymptomCategoriesResponse = {
    Categories: [
      { id: 1, name: "Cat", symptoms: [] },
    ],
  }
  it("test", () => {
    const cats = respToSymptoms(resp)
    expect(cats).toHaveLength(1)
  })
})
