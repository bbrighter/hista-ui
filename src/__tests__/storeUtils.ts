import { createStore } from 'zustand'
import { createHeadacheSlice, HeadacheStore } from '../store/headaches/headacheStore'
import { createErrorSlice, ErrorStore } from '../store/error/errorStore'
import { AuthStore, createAuthSlice } from '../store/auth/authStore'


type StoreType = HeadacheStore & ErrorStore & AuthStore

export const createTestStore = () =>
  createStore<StoreType>()((...args) => ({
    ...createHeadacheSlice(...args),
    ...createErrorSlice(...args),
    ...createAuthSlice(...args),
  }))