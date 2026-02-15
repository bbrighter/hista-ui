import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import useHista from "../../../../store/store"
import { useBarChartStatistics } from "../components/useGroupedStatistics"

describe("useBarChartStatistics", () => {
  beforeEach(() => {
    const { setSymptomStatistics, setSymptoms, setMealCount } = useHista.getState()
    setSymptoms({ Categories: [{ id: 1, name: "cat", symptoms: [
      { id: 1, categoryId: 1, name: "name1" },
      { id: 2, categoryId: 1, name: "name2" },
    ] }] })
    setSymptomStatistics([
      { severity: 1, symptomId: 1, within1hour: 1, within24hours: 1, within72hours: 1 },
      { severity: 3, symptomId: 1, within1hour: 0, within24hours: 1, within72hours: 1 },
      { severity: 1, symptomId: 2, within1hour: 0, within24hours: 0, within72hours: 1 },
    ])
    setMealCount(5)
  })
  it("ok", () => {
    const { result } = renderHook(() => useBarChartStatistics([1, 5]))
    const stats = result.current

    expect(stats).toHaveLength(2)
    expect(stats).toContainEqual({ x: "name1", total: 0, hours1: 1, hours24: 2, hours72: 2 })
    expect(stats).toContainEqual({ x: "name2", total: 4, hours1: 0, hours24: 0, hours72: 1 })
  })

  it("filter values", () => {
    const { result } = renderHook(() => useBarChartStatistics([3, 5]))
    const stats = result.current

    expect(stats).toHaveLength(1)
    expect(stats).toContainEqual({ x: "name1", total: 3, hours1: 0, hours24: 1, hours72: 1 })
  })
})
