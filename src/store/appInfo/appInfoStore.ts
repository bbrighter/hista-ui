import type { StateCreator } from "zustand";

import type {
	AppInfoStore,
	NonFunctionProperties,
	StoreType,
} from "../store.type";
import type { Entity } from "../types";

type State = NonFunctionProperties<AppInfoStore>;

const initialState = (): State => ({
	entitiesFilled: { headaches: false, statuses: false },
});

export const createAppInfoSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	AppInfoStore
> = (set) => ({
	...initialState(),

	resetAppInfo: () => {
		set(initialState());
	},
	setAppInfo: (record: Record<Entity, boolean>) => {
		set((state) => {
			state.entitiesFilled = record;
		});
	},
});
