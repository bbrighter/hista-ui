import { beforeEach, describe, expect, it, vi } from "vitest"

import { client } from "../../api/api"
import useHista from "../store"

describe("headache store", () => {
  beforeEach(async () => {
    expect(useHista.getState().isHeadacheLoaded).toBeFalsy()
    await useHista.getState().getHeadaches()
    expect(useHista.getState().isHeadacheLoaded).toBeTruthy()
  })

  it("get headaches", async () => {
    const headaches = useHista.getState().headaches
    expect(headaches).toHaveLength(1)
    const headache = headaches[0]
    expect(headache.date).toStrictEqual(new Date("2022-01-01T00:00:00Z"))
    expect(headache.id).toStrictEqual(1)
    expect(headache.description).toStrictEqual("description")
    expect(headache.positions).toHaveLength(2)
    expect(headache.symptoms).toHaveLength(2)
    expect(headache.types).toHaveLength(1)
    expect(headache.types[0]).toStrictEqual({ label: "Stechend", value: "stabbing" })
  })

  it("get one headache", async () => {
    await useHista.getState().getHeadache(1)

    const headache = useHista.getState().headache
    expect(headache.id).toBe(1)
    expect(headache.severity).toBe(3)
    expect(headache.description).toBe("description")
  })

  it("posts a new headache", async () => {
    const id = await useHista.getState().postHeadache()

    expect(id).toBe(2)
    expect(useHista.getState().headaches).toHaveLength(2)
    const headache = useHista.getState().headaches[0]
    expect(headache.id).toBe(2)
    expect(headache.severity).toBe(5)
    expect(headache.date.getTime() - new Date().getTime()).toBeLessThan(1000)
  })

  it("deletes a headache", async () => {
    await useHista.getState().deleteHeadache(1)

    expect(useHista.getState().headaches).toHaveLength(0)
  })


})

describe("Single headache actions", () => {
  const spyPatchTypes = vi.spyOn(client, "PatchHeadache")
  beforeEach(async () => {
    await useHista.getState().getHeadache(1)
  })

  it("patch headhache date", async () => {
    await useHista.getState().patchHeadacheDate(new Date(2024, 4, 15, 2, 30))
    
    const headhache = useHista.getState().headache
    expect(headhache.date).toStrictEqual(new Date(2024, 4, 15, 2, 30))
  })

  it("patch headache position", async () => {
    await useHista.getState().patchHeadachePositions([{ value: "left", label: "Links" }])

    const headhache = useHista.getState().headache
    expect(headhache.positions).toStrictEqual([{ value: "left", label: "Links" }])
  })

  it("patch headache position, no changes", async () => {
    await useHista.getState().patchHeadachePositions([{ value: "left", label: "Links" }, { value: "right", label: "Rechts" }])

    expect(spyPatchTypes).not.toHaveBeenCalled()
  })

  it("patch headache symptoms", async () => {
    await useHista.getState().patchHeadacheSymptoms([{ value: "dizziniess", label: "Schwindel" }])

    expect(useHista.getState().headache.symptoms).toStrictEqual([{ value: "dizziniess", label: "Schwindel" }])
  })
})
