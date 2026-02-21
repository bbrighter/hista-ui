import { produce } from "immer"
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
  setStatusIsLoaded: (isLoaded: boolean) => void

//   getStatuses: () => Promise<void>
//   addStatus: (date: Dayjs) => Promise<void>
//   updateStatus: (p: PutStatusParams) => Promise<void>
//   deleteStatus: (id: number) => Promise<void>
}

export interface StatusStore extends State, Actions { }

const initialState: State = {
  statuses: [],
  statusIsLoaded: false,
}

export const createStatusSlice: StateCreator<
  StatusStore,
  [],
  [],
  StatusStore> = (set) => ({
  ...initialState,
  resetStatus: () => set(initialState),

  setStatusList(statuses) {
    set(produce((draft: State) => {
      draft.statuses = statuses
    }))
  },

  updateStatus(id: number, update: Status) {
    set(produce((draft: State) => {
      const status = draft.statuses.find(s => s.id == id)
      if (!status) return
      Object.assign(status, update)
    }))
  },

  addStatus(status: Status) {
    set(produce((draft: State) => {
      draft.statuses.push(status)
    }))
  },

  removeStatus(id: number) {
    set(produce((draft: State) => {
      draft.statuses = draft.statuses.filter(s => s.id != id)
    }))    
  },

  setStatusIsLoaded(isLoaded) {
    set(produce((draft: State) => {
      draft.statusIsLoaded = isLoaded
    }))
  },
})
