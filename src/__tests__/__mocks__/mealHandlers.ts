import { http, HttpResponse } from 'msw';

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
        id: 1, date: '2024-01-01T00:00:00Z', freshness: 3, stressLevel: 1, isAlone: true, foods: [
            { id: 10, condition: 'raw', ingredient: ingredients[0] },
            { id: 20, condition: 'cooked', ingredient: ingredients[1] },
        ],
    }))),
    http.patch(baseUrl + '/meals/:id', () => (HttpResponse.json({}))),
    http.delete(baseUrl + '/meals/:id', () => (HttpResponse.json({
        ingredients: [{ id: 1, name: 'ingredient1' }],
    }))),
])

const ingredientHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/ingredients', () => (HttpResponse.json({ ingredients: ingredients }))),
])

export { mealHandlers, ingredientHandlers }