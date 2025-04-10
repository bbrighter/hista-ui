/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { client } from '../../api/api'
import { entity } from '../../api/generatedApi'
import { createTestStore } from '../../__tests__/storeUtils'

describe('headache store', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })

    it('get headaches', async () => {
        const mockResp: entity.HeadachesResponse = {
            headaches: [
                {
                    id: 1,
                    date: '2024-02-01T00:00:00Z',
                    severity: 4,
                    description: 'Some text',
                    positions: ['front'],
                    symptoms: [],
                    types: [],
                },
            ],
        }

            ; (client.api.GetHeadaches as any).mockResolvedValue(mockResp)

        await store.getState().getHeadaches()

        expect(store.getState().headaches.length).toBe(1)
        const headache = store.getState().headaches[0]
        expect(headache.id).toBe(1)
        expect(headache.severity).toBe(4)
        expect(headache.description).toBe('Some text')
        expect(headache.positions).toHaveLength(1)
        expect(headache.positions[0].label).toBe('Stirn')
        expect(store.getState().isLoaded).toBe(true)
    })

    it('get one headache if is loaded', async () => {
        store.setState({
            ...store.getState(),
            headaches: [
                { id: 1, date: new Date(), severity: 4, description: 'Some text', positions: [], symptoms: [], types: [] },
            ],
        })

        await store.getState().getHeadache(1)
        expect(store.getState().headache.id).toBe(1)
        expect(store.getState().headache.severity).toBe(4)
        expect(store.getState().headache.description).toBe('Some text')

        await store.getState().getHeadache(2)
        expect(store.getState().headache).toBeUndefined()
    })

    it('posts a new headache', async () => {
        ; (client.api.PostHeadache as any).mockResolvedValue({ id: 42 })

        const id = await store.getState().postHeadache()

        expect(id).toBe(42)
        expect(store.getState().headaches).toHaveLength(1)
        const headache = store.getState().headaches[0]
        expect(headache.id).toBe(42)
        expect(headache.severity).toBe(5)
        expect(headache.date.getTime() - new Date().getTime()).toBeLessThan(1000)
    })

    it('deletes a headache', async () => {
        store.setState({
            ...store.getState(),
            headaches: [{ id: 5, date: new Date(), severity: 3, description: '', positions: [], symptoms: [], types: [] }],
        })

        await store.getState().deleteHeadache(5)

        expect(store.getState().headaches).toHaveLength(0)
        expect(client.api.DeleteHeadache).toHaveBeenCalledWith(5)
    })
})
