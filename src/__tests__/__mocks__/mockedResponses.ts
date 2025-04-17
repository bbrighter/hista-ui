import { entity } from '../../api/generatedApi';

export const mockedConditionsEventResp: entity.ConditionEventsResponse = {
    conditionEvents: [{ id: 1, date: '2024-01-01T00:00:00Z' }],
}

export const mockedConditionEventResp: entity.ConditionEventResponse = {
    id: 2,
    date: '2024-01-01T00:00:00Z',
    conditions: [],
}

export const mockedPollenEventsResp: entity.PollenEventsResponse = {
    pollens: [
        {
            date: '2024-01-01T00:00:00Z', pollens: [
                { intensity: 3, intensityString: 'Mittel', type: 'Esche' },
                { intensity: 1, intensityString: 'Gering', type: 'Beifuss' },
            ],
        },
    ],
}