import type { StateCreator } from "zustand";

import type {
	MetaStore,
	NonFunctionProperties,
	StoreType,
} from "../store.type";
import type { Entity } from "../types";

type State = NonFunctionProperties<MetaStore>;

const initialState = (): State => ({
	entitiesFilled: { headaches: false, statuses: false },
});

export const createMetaSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	MetaStore
> = (set) => ({
	...initialState(),

	resetMeta: () => {
		set(initialState());
	},
	setMeta: (record: Record<Entity, boolean>) => {
		set((state) => {
			state.entitiesFilled = record;
		});
	},
});
