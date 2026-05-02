import { renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import { beforeEach, describe, expect, it, test } from "vitest";

import useHista from "../../store";
import { useStatus, useStatusExistsOnDay } from "../status.selectors";

test("useStatus", () => {
  const { setStatuses } = useHista.getState()
  setStatuses([
    { id: 10, date: dayjs(), eveningFitness: null, morningFitness: null, morningSleep: null },
    { id: 2, date: dayjs().add(1, "day"), eveningFitness: null, morningFitness: null, morningSleep: null },
    { id: 3, date: dayjs().add(-1, "day"), eveningFitness: null, morningFitness: null, morningSleep: null },
  ])

  const { result } = renderHook(() => useStatus())
  const statuses = result.current
  expect(statuses).toHaveLength(3)
  expect(statuses[0].id).toBe(2)
  expect(statuses[1].id).toBe(10)
  expect(statuses[2].id).toBe(3)
})

describe("useStatusExistsOnDay", () => {
  const existingDay = dayjs()
  beforeEach(() => {
    const { setStatuses, setLoaded } = useHista.getState()
    setStatuses([{ id: 10, date: existingDay, eveningFitness: null, morningFitness: null, morningSleep: null }])
    setLoaded("statuses")
  })

  it("exists", () => {
    const { result } = renderHook(() => useStatusExistsOnDay(existingDay))
    expect(result.current).toBeTruthy()
  })

  it("does not exist", () => {
    const otherDay = existingDay.add(5, "day")
    
    const { result } = renderHook(() => useStatusExistsOnDay(otherDay))
    expect(result.current).toBeFalsy()
  })

  it("not loaded", () => {
    const { setStatuses, setLoaded } = useHista.getState()
    setStatuses([])
    setLoaded("statuses", false)

    const { result } = renderHook(() => useStatusExistsOnDay(dayjs()))
    expect(result.current).toBeTruthy()
  })
})