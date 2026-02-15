import dayjs from "dayjs"
import { describe, expect, it } from "vitest"

import useHista from "../store"

describe("statusStore", () => {
  it("getStatuses", async () => {
    await useHista.getState().getStatuses()
    const statuses = useHista.getState().statuses
    expect(statuses).toHaveLength(2)

    const latestStatus = statuses[0]
    expect(latestStatus.date).toStrictEqual(dayjs("2024-01-01T13:00:00Z"))
    expect(latestStatus.id).toBe(1)
    expect(latestStatus.morningFitness).toBeDefined()
    expect(latestStatus.morningFitness).toBe(3)
    expect(latestStatus.morningSleep).toBe(2)
    expect(latestStatus.eveningFitness).toBeDefined()
    expect(latestStatus.eveningFitness).toBe(1)

    const oldStatus = statuses[1]
    expect(oldStatus.date).toStrictEqual(dayjs("2023-01-01T14:00:00Z"))
    expect(oldStatus.id).toBe(2)
  })

  it("post status", async () => {
    await useHista.getState().getStatuses()
    await useHista.getState().addStatus(dayjs("2024-03-31T00:00:00"))

    const statuses = useHista.getState().statuses
    expect(statuses).toHaveLength(3)
    expect(statuses[0].date, "latest status is on top").toStrictEqual(dayjs("2024-03-31T00:00:00"))
  })

  it("updateStatus", async () => {
    await useHista.getState().getStatuses()
    await useHista.getState().updateStatus({
      date: dayjs("2024-03-31T00:00:00"),
      morningFitness: 1,
      morningSleep: 4,
      statusId: 2,
    })

    const status = useHista.getState().statuses.find(s => s.id == 2)
    expect(status).toBeDefined()
    expect(status.morningFitness).toBe(1)
    expect(status.morningSleep).toBe(4)
  })

  it("deleteStatus", async () => {
    await useHista.getState().getStatuses()
    await useHista.getState().deleteStatus(1)

    expect(useHista.getState().statuses).toHaveLength(1)
  })
})
