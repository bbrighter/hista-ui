import { http, HttpResponse } from 'msw'

const categories = {
    Categories: [
        {
            id: 1,
            name: 'cat',
            symptoms: [
                { id: 1, name: 'symptom1', categoriyId: 1 },
                { id: 2, name: 'symptom2', categoriyId: 1 },
            ],
        },
        {
            id: 2,
            name: 'cat with no symptoms',
            symptoms: [],
        },
    ],
}


const symptomHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/symptoms', () => (HttpResponse.json(categories))),
    http.patch(baseUrl + '/symptom-categories/:id', () => (HttpResponse.json({}))),
    http.delete(baseUrl + '/symptom-categories/:id', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/symptoms/:id/category', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/symptoms/:id/name', () => (HttpResponse.json({}))),
])

const conditionEventHandlers = (baseUrl: string) => (
    [
        http.get(baseUrl + '/condition-events', () => (HttpResponse.json({
            conditionEvents: [{ id: 1, date: '2024-01-01T00:00:00Z' }],
        }))),
        http.post(baseUrl + '/condition-events', () => (HttpResponse.json(
            { id: 2, date: '2025-01-31T12:00:00Z', conditions: [] },
        ))),
        http.get(baseUrl + '/condition-events/:id', () => (HttpResponse.json(
            {
                id: 1, date: '2024-01-01T00:00:00Z', conditions: [
                    { id: 1, severity: 3, symptom: { id: 1, name: 'symptom1', categoryId: 1 } },
                ],
            },
        ))),
        http.delete(baseUrl + '/condition-events/:id', () => (HttpResponse.json(categories))),
        http.patch(baseUrl + '/condition-events/:id', async ({ request }) => {
            type RequestBody = { date: string }

            const body = (await request.json()) as Partial<RequestBody>
            if (!body.date || typeof body.date !== 'string') {
                return new HttpResponse('Invalid or missing "date"', { status: 400 })
            }

            return HttpResponse.json({})
        }),
        http.post(baseUrl + '/condition-events/:id/conditions', () => (HttpResponse.json({
            condition: { id: 4, severity: 1, symptom: { id: 2, name: 'symptom2', categoryId: 1 } },
            symptoms: categories,
        }))),
    ]
)

const conditionHandlers = (baseUrl: string) => (
    [
        http.delete(baseUrl + '/conditions/:id', () => (HttpResponse.json(categories))),
    ]
)

export { conditionEventHandlers, conditionHandlers, symptomHandlers }