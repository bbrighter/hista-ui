import { Dayjs } from "dayjs";

import { client } from "../api/api";
import { PutStatusParams, respToStatus, respToStatuses } from "../store";
import useHista from "../store/store";



export const status = {
  list: async () => {
    const { setStatuses, loaded, setLoaded } = useHista.getState()
    if (loaded["statuses"]) return

    const resp = await client.ListStatus()

    setStatuses(respToStatuses(resp))
    setLoaded("statuses")
  },

  post: async (date: Dayjs) => {
    const resp = await client.PostStatus({ date: date.toISOString() })

    const { addStatus } = useHista.getState()
    addStatus(respToStatus(resp))
  },

  delete: async (id: number) => {
    await client.DeleteStatus(id)

    const { removeStatus } = useHista.getState()
    removeStatus(id)
  },

  patch: async (id: number, params: PutStatusParams) => {
    await client.PatchStatus(id, {
      date: params.date.toISOString(),
      eveningFitness: params.eveningFitness,
      morningFitness: params.morningFitness,
      morningSleep: params.morningSleep,
    })

    const { updateStatus } = useHista.getState()
    updateStatus(id, params)
  },
}
