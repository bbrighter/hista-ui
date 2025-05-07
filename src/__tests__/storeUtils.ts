import { createStore } from 'zustand'

import { AuthStore, createAuthSlice } from '../store/auth/authStore'
import { createErrorSlice,ErrorStore } from '../store/error/errorStore'
import { createHeadacheSlice,HeadacheStore } from '../store/headaches/headacheStore'
import { createIngredientSlice,IngredientStore } from '../store/meal/ingredientStore'
import { createMealSlice,MealStore } from '../store/meal/mealStore'
import { createNotesSlice,NotesStore } from '../store/notes/notesStore'
import { createPollensSlice,PollenStore } from '../store/pollen/pollenStore'
import { createStatisticsSlice,StatisticsStore } from '../store/statistics/statisticsStore'
import { createStatusSlice,StatusStore } from '../store/status/statusStore'
import { ConditionStore, createConditionSlice } from '../store/symptom/conditionStore'
import { createSymptomSlice,SymptomStore } from '../store/symptom/symptomStore'


type StoreType = HeadacheStore & ErrorStore & AuthStore & MealStore & IngredientStore & NotesStore & ConditionStore & SymptomStore & PollenStore & StatusStore & StatisticsStore

export const createTestStore = () =>
  createStore<StoreType>()((...args) => ({
    ...createHeadacheSlice(...args),
    ...createErrorSlice(...args),
    ...createAuthSlice(...args),
    ...createMealSlice(...args),
    ...createIngredientSlice(...args),
    ...createNotesSlice(...args),
    ...createConditionSlice(...args),
    ...createSymptomSlice(...args),
    ...createPollensSlice(...args),
    ...createStatusSlice(...args),
    ...createStatisticsSlice(...args),
  }))