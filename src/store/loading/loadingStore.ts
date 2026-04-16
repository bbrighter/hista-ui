import { StateCreator } from "zustand"

import { loadingEntities, LoadingEntity, LoadingStore, NonFunctionProperties, StoreType } from "../store.type"


type State = NonFunctionProperties<LoadingStore>

const initialState = (): State => ({
  loaded: Object.fromEntries(
    loadingEntities.map(k => [k, false]),
  ) as Record<LoadingEntity, boolean> , 
})

export const createLoadingSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  LoadingStore
> = (set) => ({
  ...initialState(),

  resetLoaded: () => set(initialState()),

  setLoaded: (k :LoadingEntity) => set((state: State) => {
    state.loaded[k] = true
  }),
})