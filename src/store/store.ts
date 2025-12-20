import { create } from 'zustand'

import { injectPiidGetter } from '../api/api'
import { AuthStore, createAuthSlice } from './auth/authStore'
import { wrapActionsWithErrorHandler } from './error/errorHandler'
import { createHeadacheSlice, HeadacheStore } from './headaches/headacheStore'
import { createIngredientSlice, IngredientStore } from './meal/ingredientStore'
import { createMealSlice, MealStore } from './meal/mealStore'
import { createNotesSlice, NotesStore } from './notes/notesStore'
import { createPollensSlice, PollenStore } from './pollen/pollenStore'
import { createStatisticsSlice, StatisticsStore } from './statistics/statisticsStore'
import { createStatusSlice, StatusStore } from './status/statusStore'
import { ConditionStore, createConditionSlice } from './symptom/conditionStore'
import { createSymptomSlice, SymptomStore } from './symptom/symptomStore'

const useHista = create<
  AuthStore
  & MealStore
  & IngredientStore
  & ConditionStore
  & SymptomStore
  & StatisticsStore
  & NotesStore
  & PollenStore
  & StatusStore
  & HeadacheStore
>((...a) => {
    const store = {
        ...createMealSlice(...a),
        ...createIngredientSlice(...a),
        ...createAuthSlice(...a),
        ...createConditionSlice(...a),
        ...createSymptomSlice(...a),
        ...createStatisticsSlice(...a),
        ...createNotesSlice(...a),
        ...createPollensSlice(...a),
        ...createStatusSlice(...a),
        ...createHeadacheSlice(...a),
    }
    return wrapActionsWithErrorHandler(store, createAuthSlice(...a))
})

injectPiidGetter(() => useHista.getState().piid)

export default useHista
