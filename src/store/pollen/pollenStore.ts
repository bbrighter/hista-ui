import { produce } from 'immer'
import { StateCreator } from 'zustand'

import { client } from '../../api/api'
import { Pollens, respToPollens } from './pollen'

interface State {
  pollensAreLoaded: boolean
  pollens: Pollens
}

interface Actions {
  resetPollens: () => void

  getPollens: () => Promise<void>
}

export interface PollenStore extends State, Actions { }

const initialState: State = {
  pollensAreLoaded: false,
  pollens: [],
}

export const createPollensSlice: StateCreator<
  PollenStore,
  [],
  [],
  PollenStore> = (set, get) => ({
  ...initialState,

  resetPollens: () => set(initialState),

  getPollens: async () => {
    if (get().pollensAreLoaded) return
    const resp = await client.ListPollens()
    set(produce((draft: State) => {
      draft.pollens = respToPollens(resp)
      draft.pollensAreLoaded = true
    }))
  },
})
