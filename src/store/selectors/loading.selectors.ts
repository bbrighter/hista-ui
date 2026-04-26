import { LoadingEntity } from "../store.type";

export const selectIsLoadingAny = (keys: Array<LoadingEntity>) => 
  (state: {loaded: Record<LoadingEntity, boolean>}) => 
    !keys.every((k) => state.loaded[k])