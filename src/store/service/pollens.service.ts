import { client } from "../../api/api"
import useHista from "../store"
import { respToPollens } from "../types"

export const pollens = {
  get: async () => {
    const { setPollens, loaded, setLoaded } = useHista.getState()
    if (loaded["pollens"]) return

    const resp = await client.ListPollens()
    setPollens(respToPollens(resp))
    setLoaded("pollens")
  },
}