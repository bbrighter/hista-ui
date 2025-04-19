import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestStore } from '../../__tests__/storeUtils'

const mockLocalStorage = (() => {
    let store: Record<string, string> = {}

    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key]
        }),
        clear: vi.fn(() => {
            store = {}
        }),
    }
})()



// Object.defineProperty(window, 'localStorage', {
//     value: mockLocalStorage,
// });


describe('error store', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        mockLocalStorage.clear()
        // store = createTestStore()
        vi.clearAllMocks()
    })

    it.skip('empty local storage', () => {
        expect(1).toBe(0)
        expect(window.localStorage.getItem('isAuthenticated')).toBeFalsy()
        expect(store.getState().isAuthenticated).toBeFalsy()
    })
})