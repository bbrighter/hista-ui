import { create } from 'zustand'
import { createAuthSlice, AuthStore } from './auth/authStore'
import { createMealSlice, MealStore } from './meal/mealStore'
import { createSymptomSlice, SymptomStore } from './symptom/symptomStore'
import { ErrorStore, createErrorSlice } from './error/errorStore'
import { StatisticsStore, createStatisticsSlice } from './statistics/statisticsStore'
import { NotesStore, createNotesSlice } from './notes/notesStore'
import { PollenStore, createPollensSlice } from './pollen/pollenStore'
import { createStatusSlice, StatusStore } from './status/statusStore'
import { createHeadacheSlice, HeadacheStore } from './headaches/headacheStore'
import { createIngredientSlice, IngredientStore } from './meal/ingredientStore'

const useHista = create<
    AuthStore &
    ErrorStore &
    MealStore &
    IngredientStore &
    SymptomStore &
    StatisticsStore &
    NotesStore &
    PollenStore &
    StatusStore &
    HeadacheStore>()((...a) => ({
        ...createMealSlice(...a),
        ...createIngredientSlice(...a),
        ...createAuthSlice(...a),
        ...createSymptomSlice(...a),
        ...createErrorSlice(...a),
        ...createStatisticsSlice(...a),
        ...createNotesSlice(...a),
        ...createPollensSlice(...a),
        ...createStatusSlice(...a),
        ...createHeadacheSlice(...a),
    }))

export default useHista
