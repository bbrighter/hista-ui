import { client } from "../../api/api"
import useHista from "../store"
import { respToConditionEvent } from "../types/conditionEvent"
import { respToConditionEvents } from "../types/conditionEvents"

export const conditionEvents = {
  list: async () => {
    const { setMetaConditionEvents,  loaded, setLoaded } = useHista.getState()

    if (loaded["conditionEvents"]) return
    const resp = await client.ListConditionEvents()
    setMetaConditionEvents(respToConditionEvents(resp))
    setLoaded("conditionEvents")
  },

  get: async (id: number) => {
    const { setConditionEvent } = useHista.getState()

    const resp = await client.GetConditionEvent(id)
    setConditionEvent(respToConditionEvent(resp))
  },

  delete: async (id: number) => {
    const { removeMetaConditionEvent } = useHista.getState()

    await client.DeleteConditionEvent(id)
    removeMetaConditionEvent(id)
  },

  post: async (): Promise<number> => {
    const { setConditionEvent, setMetaConditionEvents,  metaConditionEvents } = useHista.getState()

    const resp = await client.CreateConditionEvent()
    const event = respToConditionEvent(resp)
    setConditionEvent(event)
    setMetaConditionEvents([...metaConditionEvents, event])
    return event.id
  },

  patchDate: async (id: number, date: Date) => {
    const { updateConditionEvent, updateMetaConditionEvent } = useHista.getState()

    await client.PatchDate(id, { date: date.toISOString() })
    updateConditionEvent(id, { date: date })
    updateMetaConditionEvent(id, { date: date })
  },
}