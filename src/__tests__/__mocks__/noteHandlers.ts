import { http, HttpResponse } from 'msw';

const noteHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/notes', () => (HttpResponse.json({
        notes: [{ id: 1, date: '2024-01-31T12:00:00Z', text: 'text' }],
    }))),
    http.post(baseUrl + '/notes', () => (HttpResponse.json({ id: 2, date: '2025-01-31T12:00:00Z', text: 'text new' }))),
    http.patch(baseUrl + '/notes/:id', () => (HttpResponse.json({}))),
    http.delete(baseUrl + '/notes/:id', () => (HttpResponse.json({}))),
])


export { noteHandlers }