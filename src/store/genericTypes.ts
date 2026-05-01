export type ResetAction<K extends string> = {
  [P in `reset${Capitalize<K>}`]: () => void
}

export type SetAction<T, K extends string> = {
  [P in `set${Capitalize<K>}`]: (items: Array<T>) => void
}

export type SetSingleAction<T, K extends string> = {
  [P in `set${Capitalize<K>}`]: (item: T) => void
}

type SetRecordAction<T, K extends string> = {
  [P in `set${Capitalize<K>}`]: (items: Record<number,T>) => void
}

export type AddAction<T, K extends string> = {
  [P in `add${Capitalize<K>}`]: (item: T) => void
}

type AddRecordAction<T, K extends string> = {
  [P in `add${Capitalize<K>}`]: (id: number, item: T) => void
}

export type UpdateAction<T, K extends string> = {
  [P in `update${Capitalize<K>}`]: (id: number, partial: Partial<T>) => void
}

type RemoveAction<K extends string> = {
  [P in `remove${Capitalize<K>}`]: (id: number) => void
}

export type BaseArrayStore<T, K extends string, S extends string> = {
  [P in K]: Array<T> 
} & SetAction<T,K> 
  & ResetAction<K>
  & AddAction<T,S>
  & RemoveAction<S>
  & UpdateAction<T,S>
  
export type BaseRecordStore<T, K extends string, S extends string> = {
  [P in K]: Record<number, T>
}& SetRecordAction<T,K> 
  & ResetAction<K>
  & AddRecordAction<T,S>
  & RemoveAction<S>
  & UpdateAction<T,S>

// type BaseLoadedStore<K extends string> = {
//   [P in `is${Capitalize<K>}Loaded`]: boolean
// } & LoadedAction<K>

// export type BaseStore<T, K extends string> = BaseCollectionStore<T, K> & BaseLoadedStore<K>