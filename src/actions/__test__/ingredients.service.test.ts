import { beforeEach, describe, expect, it, vi } from "vitest"

import { client } from "../../api/api"
import useHista from "../../store/store"
import { actions } from ".."



describe("ingredient list service", () => {
  const spy = vi.spyOn(client, "ListIngredients")

  it("List ingredients", async () => {
    await actions.ingredients.list()

    const { ingredients } = useHista.getState()
    expect(ingredients).toHaveLength(2)
  })

  it("Ingredients are only loaded once", async () => {
    await actions.ingredients.list()
    await actions.ingredients.list()
    expect(spy).toHaveBeenCalledOnce()  
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


  it("Rename ingredient", async () => {
    await actions.ingredients.changeName(1, "new name")

    const { ingredients } = useHista.getState()
    expect(ingredients.find(i => i.id == 1)!.name).toBe("new name")
  })

  it("Archive ingredient", async () => {
    await actions.ingredients.archive(1)

    const { ingredients } = useHista.getState()
    expect(ingredients.find(i => i.id == 1)!.isArchived).toBeTruthy()
  })

  it("Update nutrition", async () => {
    await actions.ingredients.updateNutrition(1, { carbohydrate: 100, fat: 50, fiber: 10, protein: 0 })

    const { ingredients } = useHista.getState()
    const ingredient = ingredients.find(i => i.id == 1)!
    expect(ingredient.nutrition!.carbohydrate).toBe(100)
    expect(ingredient.nutrition!.fat).toBe(50)
    expect(ingredient.nutrition!.fiber).toBe(10)
    expect(ingredient.nutrition!.protein).toBe(0)
  },
  )
})
