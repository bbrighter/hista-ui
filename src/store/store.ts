import { create } from "zustand"
import { createAuthSlice, AuthStore } from "./auth/authStore"
import { createMealSlice, MealStore } from "./meal/mealStore"
import { createSymptomSlice, SymptomStore } from "./symptom/symptomStore"
import { ErrorStore, createErrorSlice } from "./error/errorStore"
import { StatisticsStore, createStatisticsSlice } from "./statistics/statisticsStore"

const useHista = create<AuthStore & ErrorStore & MealStore & SymptomStore & StatisticsStore>()((...a) => ({
    ...createMealSlice(...a),
    ...createAuthSlice(...a),
    ...createSymptomSlice(...a),
    ...createErrorSlice(...a),
    ...createStatisticsSlice(...a),
}))

export default useHista