import { describe, expect, it, vi } from 'vitest'

import { createTestStore } from '../../__tests__/storeUtils'
import { APIError, ErrCode } from '../../api/generatedApi'
import { errorBus } from './errorBus'


describe('ErrorStore', () => {
    it('catch unknown errors', { skip: true }, () => {
        // How??
    })

    it('catch 500 API error', () => {
        const store = createTestStore()
        const apiError = new APIError(
            500,
            {
                code: ErrCode.Internal,
                message: 'internal',
                details: 'none',
            },
        )

        const emitSpy = vi.spyOn(errorBus, 'emit')

        store.getState().setError(apiError)
        expect(emitSpy).toHaveBeenCalled()
    })

    it('catch 400 API error', () => {
        const store = createTestStore()
        const apiError = new APIError(
            400,
            {
                code: ErrCode.InvalidArgument,
                message: 'invalid_argument',
                details: 'none',
            },
        )

        const emitSpy = vi.spyOn(errorBus, 'emit')

        store.getState().setError(apiError)
        expect(emitSpy).toHaveBeenCalled()
    })

    it('do not catch 404 API error', () => {
        const store = createTestStore()
        const apiError = new APIError(
            404,
            {
                code: ErrCode.NotFound,
                message: 'not found',
            },
        )
        const emitSpy = vi.spyOn(errorBus, 'emit')

        store.getState().setError(apiError)
        expect(emitSpy).not.toHaveBeenCalled()
    })

    it('logout when 401, but do not catch', () => {
        const store = createTestStore()
        const apiError = new APIError(
            401,
            {
                code: ErrCode.Unauthenticated,
                message: 'not authorized',
            },
        )
        const emitSpy = vi.spyOn(errorBus, 'emit')
        const logoutSpy = vi.spyOn(store.getState(), 'logout')

        store.getState().setError(apiError)
        expect(emitSpy).not.toHaveBeenCalled()
        expect(logoutSpy).toHaveBeenCalled()
    })
})