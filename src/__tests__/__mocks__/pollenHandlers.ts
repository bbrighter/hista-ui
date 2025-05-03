import { http, HttpResponse } from 'msw'

const pollenHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/pollen', () => HttpResponse.json({
        pollens: [
            {
                date: '2024-01-01T12:00:00Z',
                pollens: [{ type: 'Erle', intensity: 2, intensityString: 'Keine bis geringe' }],
            },
            {
                date: '2024-01-02T12:00:00Z',
                pollens: [
                    { type: 'Erle', intensity: 3, intensityString: 'Geringe' },
                    { type: 'Birke', intensity: 5, intensityString: 'Mittlere' },
                ],
            },
        ],
    })),
])



export { pollenHandlers }