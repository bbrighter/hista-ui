import { create } from "zustand"
import { createAuthSlice, AuthStore } from "./auth/authStore"
import { createMealSlice, MealStore } from "./meal/mealStore"
import { createSymptomSlice, SymptomStore } from "./symptom/symptomStore"

const useHista = create<AuthStore & MealStore & SymptomStore>()((...a) => ({
    ...createMealSlice(...a),
    ...createAuthSlice(...a),
    ...createSymptomSlice(...a)
}))

export default useHista