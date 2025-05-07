import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, beforeEach, expect } from 'vitest';

import useHista from '../store/store';
import handlers from './__mocks__/handlers';

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