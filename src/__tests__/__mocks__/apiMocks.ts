import { vi } from 'vitest';

export const mockClient = {
    api: {
        GetHeadaches: vi.fn(),
        PostHeadache: vi.fn(),
        DeleteHeadache: vi.fn(),
        PatchHeadacheSeverity: vi.fn(),
        PatchHeadacheDate: vi.fn(),
        PatchHeadachePositions: vi.fn(),
        PatchHeadacheTypes: vi.fn(),
        PatchHeadacheSymptoms: vi.fn(),
        PatchHeadacheDescription: vi.fn(),
    },
}

vi.mock('../../api/api', () => ({
    client: mockClient,
}))