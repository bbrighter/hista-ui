import { describe, expect, it } from "vitest";

import useHista from "../../store";
import { template } from "../template.service";

describe("templates service", () => {
  it("List templates", async () => {
    await template.list()

    const { templates, loaded } = useHista.getState()
    expect(loaded.templates).toBeTruthy()
    expect(templates[1]).toBeDefined()
    expect(templates[1].name).toBe("Template")
    expect(templates[1].items).toHaveLength(1)
    expect(templates[1].items[0].condition).toBe("raw")
    expect(templates[1].items[0].ingredientId).toBe(1)
  })

  it("Add template", async () => {
    await template.add("new name", [{ ingredientId: 2, condition: "cooked" }])

    const { templates } = useHista.getState()
    expect(templates[2]).toBeDefined()
    expect(templates[2].name).toBe("new name")
    expect(templates[2].items).toHaveLength(1)
    expect(templates[2].items[0].ingredientId).toBe(2)
    expect(templates[2].items[0].condition).toBe("cooked")
  })

  it("Remove template", async () => {
    await template.list()
    await template.delete(1)

    const { templates } = useHista.getState()
    expect(templates[1]).not.toBeDefined()
  })

  it("Update template", async () => {
    await template.list()

    await template.change(1, "new name", [{ condition: "cooked", ingredientId: 1 }, { condition: "raw", ingredientId: 4 }] )

    const { templates } = useHista.getState()
    expect(templates[1].name).toBe("new name")
    expect(templates[1].items).toHaveLength(2)
    expect(templates[1].items[0]).toStrictEqual({ condition: "cooked", ingredientId: 1 })
    expect(templates[1].items[1]).toStrictEqual({ condition: "raw", ingredientId: 4 })
  })
})