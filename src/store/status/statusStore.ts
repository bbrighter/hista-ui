import { StateCreator } from "zustand"

import { NonFunctionProperties, StatusStore, StoreType } from "../store.type"
import { Status } from "../types"

type State = NonFunctionProperties<StatusStore>

const initialState: State = {
  statuses: [],
}

export const createStatusSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  StatusStore> = (set) => ({
  ...initialState,
  resetStatuses: () => set(initialState),

  setStatuses(statuses) {
    set(state => {
      state.statuses = statuses
    })
  },

  updateStatus(id: number, update: Partial<Status>) {
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
})
