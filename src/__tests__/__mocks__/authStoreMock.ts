import { vi } from 'vitest'


export const mockAuthSlice = {
    isAuthenticated: true,
    logout: vi.fn(),
    login: vi.fn(),
}

vi.mock('/src/store/auth/authStore', () => ({
    createAuthSlice: () => mockAuthSlice,
}))
