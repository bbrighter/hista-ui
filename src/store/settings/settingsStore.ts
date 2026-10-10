import type { StateCreator } from "zustand";

import type {
	NonFunctionProperties,
	StoreType,
	UserSettingsStore,
} from "../store.type";
import type { UserSettings } from "../types/settings.types";

type State = NonFunctionProperties<UserSettingsStore>;

const initialState = (): State => ({
	language: "de-DE",
	loadingMode: "spinner",
});

export const createUserSettingsSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	UserSettingsStore
> = (set) => ({
	...initialState(),

	resetUserSettings: () => initialState(),

	setUserSettings: (s: Partial<UserSettings>) => {
		set((state) => {
			Object.assign(state, s);
		});
	},
});
