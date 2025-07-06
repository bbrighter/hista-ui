import { create } from 'zustand'

import { AuthStore, createAuthSlice } from './auth/authStore'
import { createErrorSlice,ErrorStore } from './error/errorStore'
import { createHeadacheSlice,HeadacheStore } from './headaches/headacheStore'
import { createIngredientSlice,IngredientStore } from './meal/ingredientStore'
import { createMealSlice,MealStore } from './meal/mealStore'
import { createNotesSlice,NotesStore } from './notes/notesStore'
import { createPollensSlice,PollenStore } from './pollen/pollenStore'
import { createStatisticsSlice,StatisticsStore } from './statistics/statisticsStore'
import { createStatusSlice,StatusStore } from './status/statusStore'
import { ConditionStore, createConditionSlice } from './symptom/conditionStore'
import { createSymptomSlice,SymptomStore } from './symptom/symptomStore'

const useHista = create<
    AuthStore &
    ErrorStore &
    MealStore &
    IngredientStore &
    ConditionStore &
    SymptomStore &
    StatisticsStore &
    NotesStore &
    PollenStore &
    StatusStore &
    HeadacheStore
>((...a) => ({
    ...createMealSlice(...a),
    ...createIngredientSlice(...a),
    ...createAuthSlice(...a),
    ...createConditionSlice(...a),
    ...createSymptomSlice(...a),
    ...createErrorSlice(...a),
    ...createStatisticsSlice(...a),
    ...createNotesSlice(...a),
    ...createPollensSlice(...a),
    ...createStatusSlice(...a),
    ...createHeadacheSlice(...a),
}))

export default useHista
