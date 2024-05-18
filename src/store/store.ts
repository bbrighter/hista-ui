import { create } from "zustand"
import { createAuthSlice, AuthStore } from "./auth/authStore"
import { createMealSlice, MealStore } from "./meal/mealStore"
import { createSymptomSlice, SymptomStore } from "./symptom/symptomStore"
import { ErrorStore, createErrorSlice } from "./error/errorStore"
import { StatisticsStore, createStatisticsSlice } from "./statistics/statisticsStore"
import { NotesStore, createNotesSlice } from "./notes/notesStore"

const useHista = create<AuthStore & ErrorStore & MealStore & SymptomStore & StatisticsStore & NotesStore>()((...a) => ({
    ...createMealSlice(...a),
    ...createAuthSlice(...a),
    ...createSymptomSlice(...a),
    ...createErrorSlice(...a),
    ...createStatisticsSlice(...a),
    ...createNotesSlice(...a),
}))

export default useHista
