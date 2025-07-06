import { http, HttpResponse } from 'msw';

import { entity } from '../../api/generatedApi';

const ingredients = [
    { id: 1, name: 'ingredient1' },
    { id: 2, name: 'ingredient2' },
]

const mealHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/meals', () => (HttpResponse.json({ meals: [{ id: 1, date: '2024-01-01T00:00:00Z' }] }))),
    http.post(baseUrl + '/meals', () => (HttpResponse.json({
        id: 2, date: '2025-06-06T12:12:12Z', freshness: 1, stressLevel: 1, isAlone: true, foods: [],
    }))),
    http.get(baseUrl + '/meals/:id', () => (HttpResponse.json({
        id: 1, date: '2024-01-01T00:00:00Z', freshness: 2, stressLevel: 1, isAlone: true, foods: [
            { id: 10, foodCondition: 'raw', ingredient: ingredients[0] },
            { id: 20, foodCondition: 'cooked', ingredient: ingredients[1] },
        ],
    } as entity.MealResponse))),
    http.patch(baseUrl + '/meals/:id', () => (HttpResponse.json({}))),
    http.delete(baseUrl + '/meals/:id', () => (HttpResponse.json({
        ingredients: [{ id: 1, name: 'ingredient1' }],
    }))),
])

const ingredientHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/ingredients', () => (HttpResponse.json({ ingredients: ingredients }))),
])

const foodHandlers = (baseUrl: string) => ([
    http.delete(baseUrl + '/foods/:id', () => (HttpResponse.json({ ingredients: [ingredients[1]] } as entity.IngredientsResponse))),
    http.patch(baseUrl + '/foods/:id/condition', () => (HttpResponse.json({}))),
])

export { foodHandlers, ingredientHandlers, mealHandlers }