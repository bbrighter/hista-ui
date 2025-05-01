import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'
import { createTestStore } from '../../__tests__/storeUtils'
import { mockClient } from '../../__tests__/__mocks__/apiMocks'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { entity } from '../../api/generatedApi'
import { conditionEventMockedResp, conditionEventsMockedResp } from '../../__tests__/__mocks__/mockedResponses'
import { mockedConditionEventState } from '../../__tests__/__mocks__/mockedStates'

describe('conditionStore', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })

    it('getConditionEvents', async () => {
        mockClient.api.GetConditionEvents.mockResolvedValue(conditionEventsMockedResp)

        await store.getState().getConditionEvents()
        expect(store.getState().conditionEvents).toHaveLength(1)
        expect(store.getState().conditionEvents[0].id).toStrictEqual(1)
        expect(store.getState().conditionEvents[0].date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('postConditionEvent', async () => {
        mockClient.api.CreateConditionEvent.mockResolvedValue(conditionEventMockedResp)

        await store.getState().postConditionEvent()
        expect(store.getState().conditionEvents).toHaveLength(1)
        expect(store.getState().conditionEvents[0].id).toStrictEqual(2)
        expect(store.getState().conditionEvents[0].date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('postConditionEvent, sorted by date', async () => {
        store.setState(mockedConditionEventState)
        const mockResp: entity.ConditionEventResponse = {
            id: 3,
            date: '2023-01-01T00:00:00Z',
            conditions: [],
        }
        mockClient.api.CreateConditionEvent.mockResolvedValue(mockResp)

        await store.getState().postConditionEvent()
        expect(store.getState().conditionEvents).toHaveLength(3)
        expect(store.getState().conditionEvents[1].id).toStrictEqual(3)
    })

    it('getConditionEvent', async () => {
        const mockResp: entity.ConditionEventResponse = {
            id: 1,
            date: '2024-01-01T00:00:00Z',
            conditions: [
                {
                    id: 10, severity: 3, symptom: {
                        id: 20, name: 'symptom', categoryId: 1,
                    },
                },
            ],
        }
        mockClient.api.GetConditionEvent.mockResolvedValue(mockResp)

        await store.getState().getConditionEvent(1)
        expect(store.getState().conditionEvent.id).toStrictEqual(1)
        expect(store.getState().conditionEvent.date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
        expect(store.getState().conditionEvent.conditions).toHaveLength(1)
        expect(store.getState().conditionEvent.conditions[0].id).toStrictEqual(10)
        expect(store.getState().conditionEvent.conditions[0].severity).toStrictEqual(3)
        expect(store.getState().conditionEvent.conditions[0].symptom.id).toStrictEqual(20)
    })

    it('deleteConditionEvent', async () => {
        store.setState({
            ...store.getState(),
            conditionEvents: [
                { id: 1, date: new Date('2024-01-01T00:00:00Z') },
                { id: 2, date: new Date('2022-01-01T00:00:00Z') },
            ],
            symptoms: [],
        })
        const mockResp: entity.SymptomCategoriesResponse = {
            Categories: [{ id: 1, name: 'category', symptoms: [{ id: 10, name: 'symptom', categoryId: 1 }] }],
        }
        mockClient.api.DeleteConditionEvent.mockResolvedValue(mockResp)

        await store.getState().deleteConditionEvent(1)
        expect(store.getState().conditionEvents).toHaveLength(1)
        expect(store.getState().conditionEvents[0].id).toStrictEqual(2)
        expect(store.getState().symptoms).toHaveLength(1)
        expect(store.getState().symptoms[0].symptoms).toHaveLength(1)
    })

    it('setConditionEventDate', async () => {
        store.setState({
            ...store.getState(),
            conditionEvent: { id: 1, date: new Date(), conditions: [] },
            conditionEvents: [{ id: 1, date: new Date() }],
        })
        mockClient.api.PatchDate.mockResolvedValue(undefined)

        const newDate = new Date('2024-01-01T00:00:00Z')
        await store.getState().setConditionEventDate(newDate)
        expect(store.getState().conditionEvent.date).toStrictEqual(newDate)
        expect(store.getState().conditionEvents[0].date).toStrictEqual(newDate)
    })

    it('postCondition', async () => {
        store.setState({
            ...store.getState(),
            conditionEvent: { id: 1, date: new Date(), conditions: [{ id: 9, severity: 2, symptom: { id: 10, categoryId: 3, name: 'old symptom' } }] },
            conditionEvents: [{ id: 1, date: new Date() }],
        })
        const mockResp: entity.PostConditionResponse = {
            condition: {
                id: 10, severity: 3, symptom: {
                    id: 20, name: 'Symptom', categoryId: 3,
                },
            },
            symptoms: {
                Categories: [
                    {
                        id: 3, name: 'Category', symptoms: [
                            { id: 20, name: 'Symptom', categoryId: 3 },
                        ],
                    },
                ],
            },
        }
        mockClient.api.PostCondition.mockResolvedValue(mockResp)

        await store.getState().postCondition(3, 20, undefined)
        expect(store.getState().conditionEvent.conditions).toHaveLength(2)
        expect(store.getState().conditionEvent.conditions[0].id).toStrictEqual(10)
    })

})