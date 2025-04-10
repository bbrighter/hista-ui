import { vi } from 'vitest'

export const mockErrorSlice = {
    errorMessage: 'no error',
    status: 0,
    setError: vi.fn(),
    clearError: vi.fn(),
}


vi.mock('/src/store/error/errorStore', () => ({
    createErrorSlice: () => mockErrorSlice,
}))