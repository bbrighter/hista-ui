import { produce } from "immer"
import { StateCreator } from "zustand"

import { Instance } from "./instance"
import { User } from "./users"

type State =  {
  instances: Array<Instance>
  token: string
  piid: string | null
  userName: string
  users: Array<User>
  instancesAreLoaded: boolean
}

interface Actions {
  setPiid: (piid: string) => void
  setInstances: (instances: Array<Instance>) => Promise<void>
  setToken: (token: string) => void
  setUserName: (name: string) => void
  setUsers: (users: Array<User>) => void
  setInstancesLoaded: (isLoaded: boolean) => void
}

export interface AuthStore extends State, Actions { }

const initialState: State = {
  instances: [],
  token: window.localStorage.getItem("token") || "",
  piid: null,
  userName: "",
  users: [],
  instancesAreLoaded: false,
}

export const createAuthSlice: StateCreator<
  AuthStore,
  [],
  [],
  AuthStore> = set => ({
  ...initialState,

  setPiid(piid: string) {
    set(produce((draft: State) => {
      draft.piid = piid
    }))
  },

  setToken(token: string) {
    window.localStorage.setItem("token", token)
    set(produce((draft: State) => {
      draft.token = token
    }))
  },

  setUserName: (name: string) => {
    set(produce((draft: State) => {
      draft.userName = name
    }))
  },

  setUsers: (users: Array<User>) => {
    set(produce((draft: State) => {
      draft.users = users
    }))
  },

  setInstances: async (instances: Array<Instance>) => {
    set(produce((draft: State) => {
      draft.instances = instances
    }))
  },

  setInstancesLoaded: (isLoaded: boolean) => {
    set(produce((draft: State) => {
      draft.instancesAreLoaded = isLoaded
    }))
  },
})
