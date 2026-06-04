import type { StateCreator } from "zustand";

import {
	type LoadingEntity,
	type LoadingStore,
	loadingEntities,
	type NonFunctionProperties,
	type StoreType,
} from "../store.type";

type State = NonFunctionProperties<LoadingStore>;

const initialState = (): State => ({
	loaded: Object.fromEntries(loadingEntities.map((k) => [k, false])) as Record<
		LoadingEntity,
		boolean
	>,
});

export const createLoadingSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	LoadingStore
> = (set) => ({
	...initialState(),

	resetLoaded: () => set(initialState()),

	setLoaded: (k: LoadingEntity, loaded?: boolean) =>
		set((state: State) => {
			state.loaded[k] = loaded !== undefined ? loaded : true;
		}),
});
