import { createStore } from 'zustand'

import { AuthStore, createAuthSlice } from '../store/auth/authStore'
import { createErrorSlice, ErrorStore } from '../store/error/errorStore'


type StoreType = ErrorStore & AuthStore

export const createTestStore = () =>
  createStore<StoreType>()((...args) => ({
    ...createErrorSlice(...args),
    ...createAuthSlice(...args),
  }))