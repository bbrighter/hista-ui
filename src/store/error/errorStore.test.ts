import '../../__tests__/__mocks__/authStoreMock'
import { createTestStore } from '../../__tests__/storeUtils'
import { APIError, ErrCode } from '../../api/generatedApi'

import { beforeEach, describe, expect, it, vi } from 'vitest'

global.alert = vi.fn((text: string) => text)


describe('error store', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })


    it('no error', () => {
        expect(store.getState().errorMessage).toBe('no error')
        expect(store.getState().status).toBe(0)
        expect(global.alert).toHaveBeenCalledTimes(0)
    })

    it('400', () => {
        const error = new APIError(400, { code: ErrCode.InvalidArgument, message: 'message', details: 'details' })
        store.getState().setError(error)
        expect(global.alert).toHaveBeenCalled()
        expect(store.getState().errorMessage).toBe('message')
        expect(global.alert).toHaveBeenCalledWith('Huch. Da habe ich mit gerechnet, aber es sollte nicht passieren: message')
    })

    it('401', () => {
        const error = new APIError(401, { code: ErrCode.Unauthenticated, message: 'unauth' })
        store.getState().setError(error)
        expect(global.alert).toHaveBeenCalledTimes(0)
        expect(store.getState().logout).toHaveBeenCalled()
    })

    it('no valid uuid', () => {
        const error = new APIError(400, { code: ErrCode.InvalidArgument, message: 'invalid uuid' })
        store.getState().setError(error)
        expect(global.alert).toHaveBeenCalledTimes(0)
        expect(store.getState().logout).toHaveBeenCalled()
    })

    it('500', () => {
        const error = new APIError(500, { code: ErrCode.Internal, message: 'message', details: 'details' })
        store.getState().setError(error)
        expect(global.alert).toHaveBeenCalled()
        expect(store.getState().errorMessage).toBe('message')
        expect(global.alert).toHaveBeenCalledWith('Etwas ist furchtbar schief gelaufen! message')
    })
})