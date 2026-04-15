import { beforeEach, describe, expect, it, vi } from "vitest";

import { client } from "../../../api/api";
import useHista from "../../store";
import { services } from "..";
import { ingredientsService } from "../ingredients.service";
import { mealService } from "../meal.service";

describe("meal service, meals", () => {
  const spyListMeals = vi.spyOn(client, "ListMeals")

  beforeEach(async () => {
    await mealService.listMeals()
  })

  it("list meals", async () => {
    const { meals } = useHista.getState()
    expect(meals).toHaveLength(1)
  })

  it("list meals only called once", async () => {
    await mealService.listMeals()

    expect(spyListMeals).toHaveBeenCalledOnce()
  })

  it("post meal", async () => {
    const id = await mealService.postMeal()
    expect(id).toBe(2)

    const { meals } = useHista.getState()
    expect(meals).toHaveLength(2)
  })

  it("get meal", async () => {
    await mealService.getMeal(1)

    const { meal } = useHista.getState()
    expect(meal).toBeDefined()
  })

  it("delete meal", async () => {
    await mealService.deleteMeal(1)

    const { meals } = useHista.getState()
    expect(meals).toHaveLength(0)
  })
})

describe("meal service, single meal", () => {
  beforeEach(async () => {
    await mealService.getMeal(1)
  })

  it("patchMealDate", async () => {
    const now = new Date()
    await mealService.patchMealDate(1, now.toISOString()) 

    const { meal } = useHista.getState()
    expect(meal.date).toStrictEqual(now)
  })

  it("post food by name", async () => {
    await mealService.postFoodByName(1, "name")

    const { meal, ingredients } = useHista.getState()
    expect(meal.foods).toContainEqual({ ingredientId: 3, ingredientName: "name", condition: "raw", id: 1, amount: undefined })
    expect(ingredients).toHaveLength(3)
  })

  it("post food by id", async () => {
    await mealService.postFoodById(1, 1)

    const { meal } = useHista.getState()
    expect(meal.foods).toContainEqual({ ingredientId: 1, ingredientName: "ingredient1", condition: "raw", id: 1, amount: undefined })
  })

  it("delete food", async () => {
    await ingredientsService.getIngredients()
    await mealService.deleteFood(20)

    const { ingredients, meal } = useHista.getState()
    expect(meal.foods).toHaveLength(1)
    expect(meal.foods[0].id).not.toBe(20)

    expect(ingredients).toHaveLength(1)
  })

  it("patch food condition", async () => {
    await mealService.patchFoodCondition(10, "cooked")

    const { meal } = useHista.getState()
    const changedFood = meal.foods.find(f => f.id == 10)
    expect(changedFood.condition).toBe("cooked")
  })

  it("patch food amount", async () => {
    await mealService.patchFoodAmount(10, 100)

    const { meal } = useHista.getState()
    const changedFood = meal.foods.find(f => f.id == 10)
    expect(changedFood.amount).toBe(100)
  })


  it("patch food amount to undefined", async () => {
    await mealService.patchFoodAmount(10, 0)

    const { meal } = useHista.getState()
    const changedFood = meal.foods.find(f => f.id == 10)
    expect(changedFood.amount).toBe(undefined)
  })

  it("post foods by template", async () => {
    await services.template.list()

    await mealService.postFoodsByTemplate(1, 1)

    const { meal } = useHista.getState()
    expect(meal.foods).toHaveLength(4)
    expect(meal.foods).toContainEqual({ id: 5, ingredientName: "ingredient1", ingredientId: 1, condition: "raw" })
    expect(meal.foods).toContainEqual({ id: 6, ingredientName: "ingredient2", ingredientId: 2, condition: "cooked" })
  })
})
