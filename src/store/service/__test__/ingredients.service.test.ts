import { beforeEach, describe, expect, it } from "vitest"

import useHista from "../../store"
import { ingredientsService } from "../ingredients.service"

describe("ingredient list service", () => {
  it("List ingredients", async () => {
    await ingredientsService.getIngredients()

    const { ingredients, ingredientsAreLoaded } = useHista.getState()
    expect(ingredientsAreLoaded).toBeTruthy()
    expect(ingredients).toHaveLength(2)
  })
})

describe("ingredients change service", () => {
  beforeEach(() => {
    const { setIngredients } = useHista.getState()
    setIngredients([
      { id: 1, isArchived: false, name: "name 1" },
      { id: 2, isArchived: false, name: "name 2" },
    ])
  })

  it("Delete ingredient", async () => {
    await ingredientsService.deleteIngredient(1)

    const { ingredients } = useHista.getState()
    expect(ingredients).toHaveLength(1)
    expect(ingredients[0].id).toBe(2)
  })

  it("Rename ingredient", async () => {
    await ingredientsService.changeName(1, "new name")

    const { ingredients } = useHista.getState()
    expect(ingredients.find(i => i.id == 1).name).toBe("new name")
  })

  it("Archive ingredient", async () => {
    await ingredientsService.archive(1)

    const { ingredients } = useHista.getState()
    expect(ingredients.find(i => i.id == 1).isArchived).toBeTruthy()
  })
})
