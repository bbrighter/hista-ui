import { http, HttpResponse } from 'msw';

const statusHandlers = (baseUrl: string) => ([

    http.get(baseUrl + '/status', () => HttpResponse.json({
        statuses: [
            {
                id: 1, date: '2024-01-01T13:00:00Z',
                morning: { id: 2, statusId: 1, fitness: 3, sleep: 2 },
                evening: { id: 3, statusId: 1, fitness: 1 },
            },
            {
                id: 2, date: '2023-01-01T14:00:00Z',
                morning: { id: 1, statusId: 2, fitness: 3, sleep: 1 },
            },
        ],
    })),
    http.post(baseUrl + '/status', () => HttpResponse.json({
        id: 3, date: '2024-03-31T00:00:00',

    })),
    http.delete(baseUrl + '/status/:id', () => HttpResponse.json({})),
    http.put(baseUrl + '/status/:id', () => HttpResponse.json({
        id: 2, date: '2023-01-01T14:00:00Z',
        morning: { id: 1, statusId: 2, fitness: 3, sleep: 1 },
        evening: { id: 4, statusId: 2, fitness: 1 },
    })),
])

export { statusHandlers }