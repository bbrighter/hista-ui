import { StateCreator } from "zustand"

import { NonFunctionProperties, PollenStore, StoreType } from "../store.type"
import { Pollen } from "../types"

type State = NonFunctionProperties<PollenStore>



const initialState: State = {
  pollens: [],
}

export const createPollensSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  PollenStore> = (set) => ({
  ...initialState,

  setPollens: (pollens: Array<Pollen>) => {set(state => {
    state.pollens = pollens
  })

  },
  resetPollens: () => set(initialState),
})
