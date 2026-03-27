import { beforeEach, describe, expect, it, vi } from "vitest"

import { client } from "../../../api/api"
import useHista from "../../store"
import { ingredientsService } from "../ingredients.service"

describe("ingredient list service", () => {
  const spy = vi.spyOn(client, "ListIngredients")

  it("List ingredients", async () => {
    await ingredientsService.getIngredients()

    const { ingredients } = useHista.getState()
    expect(ingredients).toHaveLength(2)
  })

  it("Ingredients are only loaded once", async () => {
    await ingredientsService.getIngredients()
    await ingredientsService.getIngredients()
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

  it("Update nutrition", async () => {
    await ingredientsService.updateNutrition(1, { carbohydrate: 100, fat: 50, fiber: 10, protein: 0 })

    const { ingredients } = useHista.getState()
    const ingredient = ingredients.find(i => i.id == 1)
    expect(ingredient.nutrition.carbohydrate).toBe(100)
    expect(ingredient.nutrition.fat).toBe(50)
    expect(ingredient.nutrition.fiber).toBe(10)
    expect(ingredient.nutrition.protein).toBe(0)
  },
  )
})
