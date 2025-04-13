import { createStore } from 'zustand'
import { createHeadacheSlice, HeadacheStore } from '../store/headaches/headacheStore'
import { createErrorSlice, ErrorStore } from '../store/error/errorStore'
import { AuthStore, createAuthSlice } from '../store/auth/authStore'
import { createMealSlice, MealStore } from '../store/meal/mealStore'
import { createIngredientSlice, IngredientStore } from '../store/meal/ingredientStore'
import { createNotesSlice, NotesStore } from '../store/notes/notesStore'


type StoreType = HeadacheStore & ErrorStore & AuthStore & MealStore & IngredientStore & NotesStore

export const createTestStore = () =>
  createStore<StoreType>()((...args) => ({
    ...createHeadacheSlice(...args),
    ...createErrorSlice(...args),
    ...createAuthSlice(...args),
    ...createMealSlice(...args),
    ...createIngredientSlice(...args),
    ...createNotesSlice(...args),
  }))