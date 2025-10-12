import { beforeEach, describe, expect, it, vi } from 'vitest'

import useHista from '../store'

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


describe('error store', () => {

    beforeEach(() => {
        mockLocalStorage.clear()
        vi.clearAllMocks()
    })

    it('logout', () => {
        expect(window.localStorage.getItem('token')).toBe('test-token')
        useHista.getState().logout()
        expect(window.localStorage.getItem('token')).toBeNull()
    })

    it('login', async () => {
        await useHista.getState().login('password', 'username')
        expect(window.localStorage.getItem('token')).toBe('new token')
        expect(useHista.getState().isAuthProblem).toBeFalsy()
    })

    it('get permissions', async () => {
        await useHista.getState().getPermissions()
        const permissionsSet = useHista.getState().permissionsSet
        expect(permissionsSet).toBeTruthy()
        expect(useHista.getState().selectedPiid).toBe('7b3047c2-d56d-4942-abc4-39eb85e785f2')
        expect(useHista.getState().instances).toHaveLength(1)
    })
})