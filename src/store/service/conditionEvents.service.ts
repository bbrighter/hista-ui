import { client } from "../../api/api"
import useHista from "../store"
import { respToConditionEvent } from "../types/conditionEvent"
import { respToConditionEvents } from "../types/conditionEvents"

export const conditionEvents = {
  list: async () => {
    const { setConditionEvents, setIsConditionEventsLoaded } = useHista.getState()

    const resp = await client.ListConditionEvents()
    setConditionEvents(respToConditionEvents(resp))
    setIsConditionEventsLoaded(true)
  },

  get: async (id: number) => {
    const { setConditionEvent } = useHista.getState()

    const resp = await client.GetConditionEvent(id)
    setConditionEvent(respToConditionEvent(resp))
  },

  delete: async (id: number) => {
    const { removeConditionEvent } = useHista.getState()

    await client.DeleteConditionEvent(id)
    removeConditionEvent(id)
  },

  post: async (): Promise<number> => {
    const { setConditionEvent, setConditionEvents, conditionEvents } = useHista.getState()

    const resp = await client.CreateConditionEvent()
    const event = respToConditionEvent(resp)
    setConditionEvent(event)
    setConditionEvents([...conditionEvents, event])
    return event.id
  },

  patchDate: async (id: number, date: Date) => {
    const { updateConditionEvent, updateConditionEvents } = useHista.getState()

    await client.PatchDate(id, { date: date.toISOString() })
    updateConditionEvent(id, { date: date })
    updateConditionEvents(id, { date: date })
  },
}