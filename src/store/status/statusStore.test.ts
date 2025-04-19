import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestStore } from '../../__tests__/storeUtils';
import { mockClient } from '../../__tests__/__mocks__/apiMocks';
import { statusesMockedResp, statusMockedResp } from '../../__tests__/__mocks__/mockedResponses';
import dayjs from 'dayjs';
import { statusStateMock } from '../../__tests__/__mocks__/mockedStates';


describe('statusStore', () => {
    let store: ReturnType<typeof createTestStore>

    const date = dayjs('2024-01-01T00:00:00Z')

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })

    it('getStatuses', async () => {
        mockClient.api.ListStatus.mockResolvedValue(statusesMockedResp)

        await store.getState().getStatuses()

        expect(store.getState().statuses).toHaveLength(1)
        const status = store.getState().statuses[0]
        expect(status.date).toStrictEqual(date)
        expect(status.id).toStrictEqual(1)
        expect(status.morning.fitness).toStrictEqual(3)
        expect(status.morning.sleep).toStrictEqual(2)
        expect(status.morning.timeOfDay).toStrictEqual('morning')
        expect(status.evening.fitness).toStrictEqual(1)
        expect(status.evening.timeOfDay).toStrictEqual('evening')
    })

    it('addStatus', async () => {
        mockClient.api.PostStatus.mockResolvedValue(statusMockedResp)

        await store.getState().addStatus(date)
        expect(store.getState().statuses).toHaveLength(1)
        const status = store.getState().statuses[0]
        expect(status.id).toStrictEqual(1)
        expect(status.date).toStrictEqual(date)
        expect(status.id).toStrictEqual(1)
        expect(status.morning.fitness).toStrictEqual(3)
        expect(status.morning.sleep).toStrictEqual(2)
        expect(status.morning.timeOfDay).toStrictEqual('morning')
        expect(status.evening.fitness).toStrictEqual(1)
        expect(status.evening.timeOfDay).toStrictEqual('evening')
    })

    it('updateStatus', async () => {
        mockClient.api.PutStatus.mockResolvedValue(statusMockedResp)
        store.setState({
            ...store.getState(),
            statuses: [statusStateMock],
        })
        expect(store.getState().statuses[0].morning).toBeUndefined()

        await store.getState().updateStatus({
            date: date,
            fitness: 1,
            timeOfDay: 'morning',
            morningOrEveningId: 2,
            statusId: 1,
            sleep: 3,
        })

        expect(store.getState().statuses).toHaveLength(1)
        const status = store.getState().statuses[0]
        expect(status.morning).toBeDefined()
    })

    it('deleteStatus', async () => {
        mockClient.api.DeleteStatus.mockResolvedValue(undefined)
        store.setState({
            ...store.getState(),
            statuses: [statusStateMock],
        })

        await store.getState().deleteStatus(1)
        expect(store.getState().statuses).toHaveLength(0)
    })

    it('delete nonexisting status', async () => {
        mockClient.api.DeleteStatus.mockResolvedValue(undefined)
        store.setState({
            ...store.getState(),
            statuses: [statusStateMock],
        })

        await store.getState().deleteStatus(100)
        expect(store.getState().statuses).toHaveLength(1)
    })
})