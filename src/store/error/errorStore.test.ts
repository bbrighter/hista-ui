import '../../__tests__/__mocks__/authStoreMock'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createTestStore } from '../../__tests__/storeUtils'
import { APIError, ErrCode } from '../../api/generatedApi'

describe('error store', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })


    it('no error', () => {
        expect(store.getState().error).toBeUndefined()
    })

    it('400', () => {
        const error = new APIError(400, { code: ErrCode.InvalidArgument, message: 'message', details: 'details' })
        store.getState().setError(error)
        expect(store.getState().error.statusText).toBe('message')
    })

    it('401', () => {
        const error = new APIError(401, { code: ErrCode.Unauthenticated, message: 'unauth' })
        store.getState().setError(error)
        expect(store.getState().logout).toHaveBeenCalled()
    })

    it('no valid uuid', () => {
        const error = new APIError(400, { code: ErrCode.InvalidArgument, message: 'invalid uuid' })
        store.getState().setError(error)
        expect(store.getState().logout).toHaveBeenCalled()
    })

    it('500', () => {
        const error = new APIError(500, { code: ErrCode.Internal, message: 'message', details: 'details' })
        store.getState().setError(error)
        expect(store.getState().error.statusText).toBe('message')
    })
})