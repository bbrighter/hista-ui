import dayjs from 'dayjs'
import { Status } from '../../store/status/status'
import { SymptomCategories } from '../../store/symptom/symptom'

export const mockedConditionEventState = {
    conditionEvents: [
        { id: 1, date: new Date('2024-01-01T00:00:00Z') },
        { id: 2, date: new Date('2022-01-01T00:00:00Z') },
    ],
}

export const statusStateMock: Status = {
    date: dayjs('2024-01-01T00:00:00Z'),
    id: 1,
    evening: {
        fitness: 1,
        id: 2,
        timeOfDay: 'evening',
    },
}

export const symptomsMock: SymptomCategories = [
    {
        categoryId: 1,
        categoryName: 'Cat',
        symptoms: [
            { id: 1, name: 'symptom1', categoryId: 1 },
            { id: 2, name: 'symptom2', categoryId: 1 },
        ],
    },
    {
        categoryId: 2,
        categoryName: 'Cat2',
        symptoms: [],
    },
]