import { create } from 'zustand'
import { createAuthSlice, AuthStore } from './auth/authStore'
import { createMealSlice, MealStore } from './meal/mealStore'
import { createSymptomSlice, SymptomStore } from './symptom/symptomStore'
import { ErrorStore, createErrorSlice } from './error/errorStore'
import { StatisticsStore, createStatisticsSlice } from './statistics/statisticsStore'
import { NotesStore, createNotesSlice } from './notes/notesStore'
import { PollenStore, createPollensSlice } from './pollen/pollenStore'

const useHista = create<AuthStore & ErrorStore & MealStore & SymptomStore & StatisticsStore & NotesStore & PollenStore>()((...a) => ({
    ...createMealSlice(...a),
    ...createAuthSlice(...a),
    ...createSymptomSlice(...a),
    ...createErrorSlice(...a),
    ...createStatisticsSlice(...a),
    ...createNotesSlice(...a),
    ...createPollensSlice(...a),
}))

export default useHista
