import { describe, expect, it } from "vitest";

import useHista from "../../store/store";
import { conditionEvents as service } from "../conditionEvents.actions";

describe("condition events service", () => {
  it("list events", async () => {
    await service.list()

    const { metaConditionEvents, loaded } = useHista.getState()
    expect(loaded["conditionEvents"]).toBeTruthy()
    expect(metaConditionEvents).toHaveLength(1)
  })

  it("get event", async () => {
    await service.get(1)

    const { conditionEvent } = useHista.getState()
    expect(conditionEvent.id).toBe(1)
    expect(conditionEvent.date).toStrictEqual(new Date("2024-01-01T00:00:00Z"))
    expect(conditionEvent.conditions).toHaveLength(1)
  })

  it("delete event", async () => {
    await service.list()

    await service.delete(1)

    const { metaConditionEvents } = useHista.getState()
    expect(metaConditionEvents).toHaveLength(0)
  })

  it("delete event with wrong id", async () => {
    await service.list()

    await service.delete(10)

    const { metaConditionEvents } = useHista.getState()
    expect(metaConditionEvents).toHaveLength(1)
  })

  it("post event", async () => {
    await service.post()

    const { metaConditionEvents } = useHista.getState()
    expect(metaConditionEvents).toHaveLength(1)
  })

  it("patch date", async () => {
    await service.list()
    await service.get(1)

    const date = new Date("2022-09-13T00:00:00")
    await service.patchDate(1, date)

    const { metaConditionEvents, conditionEvent } = useHista.getState()
    expect(conditionEvent.date).toStrictEqual(date)
    expect(metaConditionEvents[0].date).toStrictEqual(date)
  })
})