import { entity } from '../../api/generatedApi';

export const conditionEventsMockedResp: entity.ConditionEventsResponse = {
    conditionEvents: [{ id: 1, date: '2024-01-01T00:00:00Z' }],
}

export const conditionEventMockedResp: entity.ConditionEventResponse = {
    id: 2,
    date: '2024-01-01T00:00:00Z',
    conditions: [],
}

export const pollenEventsMockedResp: entity.PollenEventsResponse = {
    pollens: [
        {
            date: '2024-01-01T00:00:00Z', pollens: [
                { intensity: 3, intensityString: 'Mittel', type: 'Esche' },
                { intensity: 1, intensityString: 'Gering', type: 'Beifuss' },
            ],
        },
    ],
}

export const statusMockedResp: entity.StatusResponse = {
    id: 1, date: '2024-01-01T00:00:00Z',
    evening: { fitness: 1, id: 2, statusId: 1 },
    morning: { fitness: 3, id: 3, statusId: 1, sleep: 2 },
}

export const statusesMockedResp: entity.StatusesResponse = {
    statuses: [statusMockedResp],
}