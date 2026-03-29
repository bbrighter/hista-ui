import { renderHook } from "@testing-library/react";
import { beforeEach,describe, expect, it } from "vitest";

import useHista from "../../store";
import { useIsCategoryNameAvailable, useIsSymptomNameAvailable } from "../symptom.selectors";

describe("useIsSymptomNameAvailable", () => {
  beforeEach(() => {
    const { setSymptoms } = useHista.getState()
    setSymptoms([
      { categoryId: 1, categoryName: "", symptoms: [{ categoryId: 1,id: 1, name: "name" }] },
      { categoryId: 2, categoryName: "", symptoms: [{ categoryId: 2, id: 2, name: "other " }] },
      { categoryId: 3, categoryName: "", symptoms: [] },
    ])
  })

  it("name taken", () => {
    const { result } = renderHook(() => useIsSymptomNameAvailable()("name", 1))
    expect(result.current).toBeFalsy()
  })

  it("other name taken", () => {
    const { result } = renderHook(() => useIsSymptomNameAvailable()("other", 2))
    expect(result.current).toBeFalsy()
  })

  it("other name free in cat 1", () => {
    const { result } = renderHook(() => useIsSymptomNameAvailable()("other", 1))
    expect(result.current).toBeTruthy()
  })

  it("whitespaces are ignored", () => {
    const { result } = renderHook(() => useIsSymptomNameAvailable()(" name ", 1))
    expect(result.current).toBeFalsy()
  })

  it("new name is okay", () => {
    const { result } = renderHook(() => useIsSymptomNameAvailable()("new name", 1))
    expect(result.current).toBeTruthy()
  })
})

describe("useIsCatNameAvailable", () => {
  beforeEach(() => {
    const { setSymptoms } = useHista.getState()
    setSymptoms([
      { categoryId: 1, categoryName: "cat 1", symptoms: [{ categoryId: 1,id: 1, name: "name" }] },
      { categoryId: 2, categoryName: " cat 2 ", symptoms: [{ categoryId: 2, id: 2, name: "other " }] },
      { categoryId: 3, categoryName: "cat 3", symptoms: [] },
    ])
  })

  it("name taken", () => {
    const { result } = renderHook(() => useIsCategoryNameAvailable()("cat 1"))
    expect(result.current).toBeFalsy()
  })

  it("name taken with whitespace", () => {
    const { result } = renderHook(() => useIsCategoryNameAvailable()(" cat 1 "))
    expect(result.current).toBeFalsy()
  })

  it("whitespace name taken", () => {
    const { result } = renderHook(() => useIsCategoryNameAvailable()("cat 2"))
    expect(result.current).toBeFalsy()
  })

  it("name free", () => {
    const { result } = renderHook(() => useIsCategoryNameAvailable()("new cat"))
    expect(result.current).toBeTruthy()
  })

})