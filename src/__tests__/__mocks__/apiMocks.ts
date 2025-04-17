import { vi } from 'vitest';


export const mockClient = {
    api: {
        GetMeal: vi.fn(),
        GetMeals: vi.fn(),
        PostMeal: vi.fn(),
        DeleteMeal: vi.fn(),
        PatchMeal: vi.fn(),
        GetFoods: vi.fn(),
        PostFood: vi.fn(),
        DeleteFood: vi.fn(),
        PatchFoodCondition: vi.fn(),
        GetIngredients: vi.fn(),

        GetHeadaches: vi.fn(),
        PostHeadache: vi.fn(),
        DeleteHeadache: vi.fn(),
        PatchHeadacheSeverity: vi.fn(),
        PatchHeadacheDate: vi.fn(),
        PatchHeadachePositions: vi.fn(),
        PatchHeadacheTypes: vi.fn(),
        PatchHeadacheSymptoms: vi.fn(),
        PatchHeadacheDescription: vi.fn(),

        GetNotes: vi.fn(),
        PatchNote: vi.fn(),
        PostNote: vi.fn(),
        DeleteNote: vi.fn(),

        PostSymptomCategory: vi.fn(),
        GetSymptoms: vi.fn(),

        PostCondition: vi.fn(),
        DeleteCondition: vi.fn(),
        PatchCondition: vi.fn(),

        GetConditionEvents: vi.fn(),
        GetConditionEvent: vi.fn(),
        CreateConditionEvent: vi.fn(),
        DeleteConditionEvent: vi.fn(),
        PatchDate: vi.fn(),
    },
}

vi.mock('../../api/api', () => ({
    client: mockClient,
}))