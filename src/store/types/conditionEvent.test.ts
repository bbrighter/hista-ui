import { expect, test } from "vitest"

import { hista } from "../../api/generatedApi"
import { respToConditionEvent } from "./conditionEvent"

test("respToConditionEvent", () => {
  const resp: hista.ConditionEventResponse = {
    id: 1,
    date: "2024-05-05T20:45:15.913+02:00",
    conditions: [
      { id: 1, severity: 1, symptomId: 1 },
    ],
  }
  const event = respToConditionEvent(resp)
  expect(event.id).toBe(1)
  expect(event.conditions).toHaveLength(1)
})
