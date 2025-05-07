import { afterAll, afterEach, beforeAll, beforeEach, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node'
import handlers from './src/__tests__/__mocks__/handlers'
import useHista from './src/store/store'

expect.extend(matchers);

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
beforeEach(() => {
    const store = useHista.getState()
    store.resetSymptoms()
    store.resetConditionEvents()
    store.resetMeals()
    store.resetHeadaches()
    store.resetPollens()
    store.resetStatistics()
    store.resetStatus()

})
afterEach(() => {
    server.resetHandlers()
})
afterAll(() => server.close())