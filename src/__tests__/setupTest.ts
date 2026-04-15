import * as matchers from "@testing-library/jest-dom/matchers"
import { cleanup } from "@testing-library/react"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from "vitest"

import useHista from "../store/store"
import handlers from "./__mocks__/handlers"

expect.extend(matchers)

export const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" })

  if (process.env.DEBUG) {
    server.events.on("request:start", ({ request }) => {
      // eslint-disable-next-line no-console
      console.log("➡️", request.method, request.url)
      // eslint-disable-next-line no-console
      console.log("   Headers:", Object.fromEntries(request.headers.entries()))
    })
  }
})

beforeEach(() => {
  vi.resetAllMocks()
  const store = useHista.getState()
  store.resetSymptoms()
  store.resetConditionEvents()
  store.resetMeals()
  store.resetHeadaches()
  store.resetPollens()
  store.resetStatistics()
  store.resetStatus()
  store.resetMedicines()
  store.resetIngredients()
  store.resetNotes()
  store.resetTemplates()
  store.resetLoaded()
  store.setPiid("7b3047c2-d56d-4942-abc4-39eb85e785f2")
  Storage.prototype.setItem = vi.fn()
  Storage.prototype.getItem = vi.fn(() => "test-token")
  Storage.prototype.clear = vi.fn()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())