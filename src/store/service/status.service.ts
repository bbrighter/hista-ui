import { Dayjs } from "dayjs";

import { client } from "../../api/api";
import useHista from "../store";
import { PutStatusParams, respToStatus, respToStatuses } from "../types";

export const statusService = {
  getStatuses: async () => {
    const { setStatuses, loaded, setLoaded } = useHista.getState()
    if (loaded["statuses"]) return

    const resp = await client.ListStatus()

    setStatuses(respToStatuses(resp))
    setLoaded("statuses")
  },

  postStatus: async (date: Dayjs) => {
    const resp = await client.PostStatus({ date: date.toISOString() })

    const { addStatus } = useHista.getState()
    addStatus(respToStatus(resp))
  },

  deleteStatus: async (id: number) => {
    await client.DeleteStatus(id)

    const { removeStatus } = useHista.getState()
    removeStatus(id)
  },

  patchStatus: async (id: number, params: PutStatusParams) => {
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
