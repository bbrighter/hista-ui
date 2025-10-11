import { http, HttpResponse } from 'msw';

import { entity } from '../../api/generatedApi';

const headache: entity.HeadacheResponse = {
    id: 1,
    date: '2022-01-01T00:00:00Z',
    severity: 3,
    types: ['stabbing'],
    positions: ['left', 'right'],
    symptoms: ['tired', 'nausea'],
    description: 'description',
}

const headacheHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/headaches', () => (HttpResponse.json({ headaches: [headache] }))),
    http.post(baseUrl + '/headaches', () => (HttpResponse.json({ id: 2 }))),
    http.get(baseUrl + '/headaches/:id', () => (HttpResponse.json(headache))),
    http.delete(baseUrl + '/headaches/:id', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/headaches/:id/date', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/headaches/:id/description', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/headaches/:id/positions', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/headaches/:id/severity', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/headaches/:id/symptoms', () => (HttpResponse.json({}))),
    http.patch(baseUrl + '/headaches/:id/types', () => (HttpResponse.json({}))),
])

export { headacheHandlers }