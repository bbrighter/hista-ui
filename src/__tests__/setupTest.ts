import * as matchers from "@testing-library/jest-dom/matchers"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, beforeEach, expect } from "vitest"

import useHista from "../store/store"
import handlers from "./__mocks__/handlers"

expect.extend(matchers)

export const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" })
  // // Uncomment to allow debugging more easily
  // server.events.on('request:start', ({ request }) => {
  //     console.log('➡️', request.method, request.url)
  //     console.log('   Headers:', Object.fromEntries(request.headers.entries()))
  // })
})

beforeEach(() => {
  const store = useHista.getState()
  store.resetSymptoms()
  store.resetConditionEvents()
  store.resetMeals()
  store.resetHeadaches()
  store.resetPollens()
  store.resetStatistics()
  store.resetStatus()
  store.setPiid("7b3047c2-d56d-4942-abc4-39eb85e785f2")
  window.localStorage.setItem("token", "test-token")
})
afterEach(() => {
  server.resetHandlers()
  window.localStorage.clear()
})
afterAll(() => server.close())
