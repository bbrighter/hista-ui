import { describe, expect, it } from "vitest";

import { hista } from "../../api/generatedApi";
import { respToIngredients } from "./ingredients.types";

describe("respToIngredients", () => {
  it("all filled", () => {
    const resp: hista.IngredientResponse = {
      id: 1,
      isArchived: true,
      name: "name",
      nutrition: {
        carbohydrate: 100,
        fat: 20,
        fiber: 0,
        protein: 5,
      },
    }

    const ings = respToIngredients({ ingredients: [resp] })
    expect(ings).toHaveLength(1)
    const ing = ings[0]
    expect(ing.id).toBe(1)
    expect(ing.isArchived).toBeTruthy()
    expect(ing.name).toBe("name")
    expect(ing.nutrition).toBeDefined()
    expect(ing.nutrition!.carbohydrate).toBe(100)
    expect(ing.nutrition!.fat).toBe(20)
    expect(ing.nutrition!.fiber).toBe(0)
    expect(ing.nutrition!.protein).toBe(5)
  })

  it("no nutrition", () => {
    const resp: hista.IngredientResponse = {
      id: 1,
      isArchived: true,
      name: "name",
    }

    const ings = respToIngredients({ ingredients: [resp] })
    expect(ings).toHaveLength(1)
    const ing = ings[0]
    expect(ing.id).toBe(1)
    expect(ing.isArchived).toBeTruthy()
    expect(ing.name).toBe("name")
    expect(ing.nutrition).not.toBeDefined()
  })
})