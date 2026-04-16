import dayjs from "dayjs";
import { beforeEach, describe, expect, it } from "vitest";

import useHista from "../../store";
import { statusService } from "../status.service";

describe("status service", () => {

  beforeEach( async () => {
    await statusService.getStatuses()
  })

  it("get", async () => {

    const { statuses, loaded } = useHista.getState()
    expect(statuses).toHaveLength(2)
    expect(statuses).toContainEqual({ 
      id: 1, 
      date: dayjs("2024-01-01T13:00:00Z"), 
      morningFitness: 3, 
      morningSleep: 2, 
      eveningFitness: 1,
      locked: true,
    })
    expect(statuses).toContainEqual({ 
      id: 2, 
      date: dayjs("2023-01-01T14:00:00Z"),
      morningFitness: 3, 
      morningSleep: 1, 
      locked: true,
    })
    expect(loaded["statuses"]).toBeTruthy()
  })

  it("delete", async () => {
    await statusService.deleteStatus(1)

    const { statuses } = useHista.getState()
    expect(statuses).toHaveLength(1)
    expect(statuses[0].id).toBe(2)
  })

  it("create", async () => {
    await statusService.postStatus(dayjs())

    const { statuses } = useHista.getState()
    expect(statuses).toHaveLength(3)
    expect(statuses.some(s => s.id == 3)).toBeTruthy()
  })

  it("patch", async () => {
    await statusService.patchStatus(2, { date: dayjs(),eveningFitness: 2,statusId: 2 })
    
    const { statuses } = useHista.getState()
    expect(statuses).toHaveLength(2)
    const status = statuses.find(s => s.id == 2)!
    expect(status.eveningFitness).toBe(2)
    expect(status.morningFitness).toBe(3)

  })
})