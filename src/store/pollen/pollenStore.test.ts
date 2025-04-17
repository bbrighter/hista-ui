import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'
import { mockClient } from '../../__tests__/__mocks__/apiMocks';
import { mockedPollenEventsResp } from '../../__tests__/__mocks__/mockedResponses';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestStore } from '../../__tests__/storeUtils';

describe('pollenStore', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })

    it('getPollens', async () => {
        mockClient.api.GetPollens.mockResolvedValue(mockedPollenEventsResp)

        expect(store.getState().pollensAreLoaded).toBeFalsy()
        await store.getState().getPollens()

        expect(store.getState().pollensAreLoaded).toBeTruthy()
        expect(store.getState().pollens).toHaveLength(1)
        const pollen = store.getState().pollens[0]
        expect(pollen.esche.intensity).toBe(3)
        expect(pollen.beifuss.intensity).toBe(1)
        expect(pollen.ambrosia.intensity).toBe(0)
        expect(pollen.date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))

    })
})