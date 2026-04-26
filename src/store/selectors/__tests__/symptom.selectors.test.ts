import { renderHook } from "@testing-library/react";
import { beforeEach,describe, expect, it } from "vitest";

import useHista from "../../store";
import { useConditionsWithSymptoms, useIsCategoryNameAvailable, useIsSymptomNameAvailable } from "../symptom.selectors";

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

  it("category does not exist", () => {
    const { result } = renderHook(() => useIsSymptomNameAvailable()("new name", 100))
    expect(result.current).toBeFalsy()
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

describe("useConditionsWithSymptoms", () => {
  beforeEach(() => {
    const { setSymptoms } = useHista.getState()
    setSymptoms([
      { categoryId: 1, categoryName: "Cat 1", symptoms: [
        { categoryId: 1, id: 1, name: "Symptom 1" },
        { categoryId: 1, id: 2, name: "Symptom 2" },
      ] },
      { categoryId: 2, categoryName: "Cat 2", symptoms: [
        { categoryId: 2, id: 3, name: "Symptom 3" },
      ] },
    ])
  })

  it("ok", () => {
    const {  setConditionEvent } = useHista.getState()
    setConditionEvent({ id: 1, date:  new Date(), conditions: [
      { id: 1, severity: 3, symptomId: 1 },
      { id: 2, severity: 1, symptomId: 3 },
    ] })

    const { result } = renderHook(() => useConditionsWithSymptoms())

    expect(result.current).toHaveLength(2)
    expect(result.current).toContainEqual({ catId: 1, catName: "Cat 1", symptomId: 1, symptomName: "Symptom 1", id: 1, severity: 3 })
    expect(result.current).toContainEqual({ catId: 2, catName: "Cat 2", symptomId: 3, symptomName: "Symptom 3", id: 2, severity: 1 })
  })

  it("not found", () => {
    const {  setConditionEvent } = useHista.getState()
    setConditionEvent({ id: 1, date:  new Date(), conditions: [
      { id: 1, severity: 3, symptomId: 1 },
      { id: 2, severity: 1, symptomId: 5 },
    ] })

    const { result } = renderHook(() => useConditionsWithSymptoms())

    expect(result.current).toHaveLength(2)
    expect(result.current).toContainEqual({ catId: 1, catName: "Cat 1", symptomId: 1, symptomName: "Symptom 1", id: 1, severity: 3 })
    expect(result.current).toContainEqual({ symptomId: 5, id: 2, severity: 1 })
  })
})