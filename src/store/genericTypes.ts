type ResetAction<K extends string> = {
  [P in `reset${Capitalize<K>}`]: () => void
}

type SetAction<T, K extends string> = {
  [P in `set${Capitalize<K>}`]: (items: Array<T>) => void
}

type AddAction<T, K extends string> = {
  [P in `add${Capitalize<K>}`]: (item: T) => void
}

type UpdateAction<T, K extends string> = {
  [P in `update${Capitalize<K>}`]: (id: number, partial: Partial<T>) => void
}

type RemoveAction<K extends string> = {
  [P in `remove${Capitalize<K>}`]: (id: number) => void
}

// type LoadedAction<K extends string> = {
//   [P in `set${Capitalize<K>}Loaded`]: (loaded: boolean) => void
// }

export type BaseCollectionStore<T, K extends string> = {
  [P in K]: Array<T> 
} & SetAction<T,K> 
  & ResetAction<K>
  & AddAction<T,K>
  & RemoveAction<K>
  & UpdateAction<T,K>
  
// type BaseLoadedStore<K extends string> = {
//   [P in `is${Capitalize<K>}Loaded`]: boolean
// } & LoadedAction<K>

// export type BaseStore<T, K extends string> = BaseCollectionStore<T, K> & BaseLoadedStore<K>