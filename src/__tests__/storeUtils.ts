import { createStore } from 'zustand'
import { createHeadacheSlice, HeadacheStore } from '../store/headaches/headacheStore'
import { createErrorSlice, ErrorStore } from '../store/error/errorStore'
import { AuthStore, createAuthSlice } from '../store/auth/authStore'
import { createMealSlice, MealStore } from '../store/meal/mealStore'


type StoreType = HeadacheStore & ErrorStore & AuthStore & MealStore

export const createTestStore = () =>
  createStore<StoreType>()((...args) => ({
    ...createHeadacheSlice(...args),
    ...createErrorSlice(...args),
    ...createAuthSlice(...args),
    ...createMealSlice(...args),
  }))