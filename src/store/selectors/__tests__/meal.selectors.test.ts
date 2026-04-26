import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

import useHista from "../../store";
import { Freshness } from "../../types";
import { useTotalMealNutrition } from "../meal.selectors";


test("useTotalNutrition", () => {
  const { setIngredients, setMeal } = useHista.getState()
  setMeal({ 
    id: 1,
    date: new Date(), 
    freshness: Freshness.fresh, 
    isAlone: true, 
    stressLevel: 3, 
    foods:[
      { id: 1, condition: "cooked", ingredientId: 1, amount: 100 },
      { id: 2, condition: "cooked", ingredientId: 2, amount: 10  },
      { id: 3, condition: "cooked", ingredientId: 3 },
    ] })
  setIngredients([
    { id: 1, name: "name 1", isArchived: false, nutrition: { carbohydrate: 25, fat: 3, fiber: 10, protein: 5 } },
    { id: 2, name: "name 2", isArchived: false },
    { id: 3, name: "name 3", isArchived: false, nutrition: { carbohydrate: 10, fat: 10, fiber: 10, protein: 10 } },
  ])

  const { result } = renderHook(() => useTotalMealNutrition())
  expect(result.current.carbohydrate).toBe(25)
  expect(result.current.fat).toBe(3)
  expect(result.current.fiber).toBe(10)
  expect(result.current.protein).toBe(5)

})