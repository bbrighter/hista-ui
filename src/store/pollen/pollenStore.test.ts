import { describe, expect, it } from "vitest"

import useHista from "../store"

describe("pollenStore", () => {
  it("getPollens", async () => {
    expect(useHista.getState().pollensAreLoaded).toBeFalsy()
    await useHista.getState().getPollens()
    expect(useHista.getState().pollensAreLoaded).toBeTruthy()

    const pollens = useHista.getState().pollens
    expect(pollens).toHaveLength(2)
    const firstPollen = pollens[0]
    expect(firstPollen.erle.intensity).toBe(2)
    expect(firstPollen.ambrosia.intensity).toBe(0)

    const secondPollen = pollens[1]
    expect(secondPollen.erle.intensity).toBe(3)
    expect(secondPollen.birke.intensity).toBe(5)
  })
})
