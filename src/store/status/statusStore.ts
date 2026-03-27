import { StateCreator } from "zustand"

import { Status, Statuses } from "../types"

type State = {
  statuses: Statuses
  statusIsLoaded: boolean
}

interface Actions {
  resetStatus: () => void
  setStatusList: (statuses: Array<Status>) => void
  addStatus: (status: Status) => void
  updateStatus: (id: number, update: Partial<Status>) => void
  removeStatus: (id: number) => void
  setStatusIsLoaded: (loaded: boolean) => void,
}

export interface StatusStore extends State, Actions { }

const initialState: State = {
  statuses: [],
  statusIsLoaded: false,
}

export const createStatusSlice: StateCreator<
  StatusStore,
  [["zustand/immer", never]],
  [],
  StatusStore> = (set) => ({
  ...initialState,
  resetStatus: () => set(initialState),

  setStatusList(statuses) {
    set(state => {
      state.statuses = statuses
    })
  },

  updateStatus(id: number, update: Status) {
    set(state => {
      const status = state.statuses.find(s => s.id == id)
      if (!status) return
      Object.assign(status, update)
    })
  },

  addStatus(status: Status) {
    set(state => {
      state.statuses.push(status)
    })
  },

  removeStatus(id: number) {
    set(state => {
      state.statuses = state.statuses.filter(s => s.id != id)
    })    
  },

  setStatusIsLoaded(loaded: boolean) {
    set(state => {
      state.statusIsLoaded = loaded
    })
  },
})
