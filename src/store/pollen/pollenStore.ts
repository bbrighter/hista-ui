import { StateCreator } from "zustand"

import { client } from "../../api/api"
import { NonFunctionProperties, PollenStore, StoreType } from "../store.type"
import { respToPollens } from "../types"

type State = NonFunctionProperties<PollenStore>



const initialState: State = {
  pollensAreLoaded: false,
  pollens: [],
}

export const createPollensSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  PollenStore> = (set, get) => ({
  ...initialState,

  resetPollens: () => set(initialState),

  getPollens: async () => {
    if (get().pollensAreLoaded) return
    const resp = await client.ListPollens()
    set(state => {
      state.pollens = respToPollens(resp)
      state.pollensAreLoaded = true
    })
  },
})
