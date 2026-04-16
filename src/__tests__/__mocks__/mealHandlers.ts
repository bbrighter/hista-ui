import { http, HttpResponse } from "msw"

import { entity, hista } from "../../api/generatedApi"

const ingredients = [
  { id: 1, name: "ingredient1", isArchived: false, nutrition: { carbohydrate: 20, fat: 5, fiber: 0, protein: 3 } },
  { id: 2, name: "ingredient2", isArchived: false },
] satisfies Array<entity.IngredientResponse>

const mealHandlers = (baseUrl: string) => ([
  http.get(baseUrl + "/meals", () => (HttpResponse.json({ meals: [{ id: 1, date: "2024-01-01T00:00:00Z" }] }))),
  http.post(baseUrl + "/meals", () => (HttpResponse.json({
    id: 2, date: "2025-06-06T12:12:12Z", freshness: 1, stressLevel: 1, isAlone: true, foods: [],
  }))),
  http.get(baseUrl + "/meals/:id", () => (HttpResponse.json({
    id: 1, date: "2024-01-01T00:00:00Z", freshness: 2, stressLevel: 1, isAlone: true, foods: [
      { id: 10, foodCondition: "raw", ingredient: ingredients[0], amount: 100 },
      { id: 20, foodCondition: "cooked", ingredient: ingredients[1] },
    ],
  } as entity.MealResponse))),
  http.patch(baseUrl + "/meals/:id", () => (HttpResponse.json({}))),
  http.delete(baseUrl + "/meals/:id", () => (HttpResponse.json({
    ingredients: [{ id: 1, name: "ingredient1" }],
  }))),
])

const ingredientHandlers = (baseUrl: string) => ([
  http.get(baseUrl + "/ingredients", () => (HttpResponse.json({ ingredients: ingredients }))),
  http.delete(baseUrl + "/ingredients/:id", () => (HttpResponse.json({}))),
  http.patch(baseUrl + "/ingredients/:id", () => (HttpResponse.json({}))),
])

const foodHandlers = (baseUrl: string) => ([
  http.delete(baseUrl + "/foods/:id", () => (HttpResponse.json({ ingredients: [ingredients[1]] } as entity.IngredientsResponse))),
  http.patch(baseUrl + "/foods/:id/condition", () => (HttpResponse.json({}))),
  http.patch(baseUrl + "/foods/:id/amount", () => (HttpResponse.json({}))),
  http.post(baseUrl + "/meal/:id/foods", async ({ request }) => {
    const body = await request.json() as { ingredientName: string } | { ingredientId: number }
    if ("ingredientName" in body) {
      const name = body.ingredientName
      return HttpResponse.json(
        {
          food:
                        { id: 1, ingredient: { id: 3, name: name }, foodCondition: "raw" },
          ingredients:
                        { ingredients: [{ id: 3, name: name }, ...ingredients] },
        } as hista.PostFoodResponse)
    }
    const name = ingredients.find(i => i.id == body.ingredientId).name
    return HttpResponse.json(
      {
        food:
                    { id: 1, ingredient: { id: body.ingredientId, name: name }, foodCondition: "raw" },
        ingredients:
                    { ingredients: ingredients },
      } as hista.PostFoodResponse)
  }),
  http.post(`${baseUrl}/meal/:id/foods/by-template/:templateId`, () => (HttpResponse.json({
    foods: [
      {      id: 5, foodCondition: "raw", ingredient: ingredients[0] },
      { id: 6, foodCondition: "cooked", ingredient: ingredients[1] },
    ],
  } satisfies entity.FoodsResponse,
  ))),
])

export { foodHandlers, ingredientHandlers, mealHandlers }
