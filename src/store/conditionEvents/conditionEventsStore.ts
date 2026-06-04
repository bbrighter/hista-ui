import type { StateCreator } from "zustand";

import type {
	ConditionEventsStore,
	NonFunctionProperties,
	StoreType,
} from "../store.type";
import type { MetaConditionEvent } from "../types";

type State = NonFunctionProperties<ConditionEventsStore>;

const initialState: State = {
	metaConditionEvents: [],
};

export const createConditionsSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	ConditionEventsStore
> = (set) => ({
	...initialState,

	resetMetaConditionEvents: () => set(initialState),

	setMetaConditionEvents: (events: Array<MetaConditionEvent>) =>
		set((state: State) => {
			state.metaConditionEvents = events;
		}),

	addMetaConditionEvent: (event: MetaConditionEvent) =>
		set((state: State) => {
			state.metaConditionEvents.push(event);
		}),

	updateMetaConditionEvent: (id: number, part: Partial<MetaConditionEvent>) =>
		set((state: State) => {
			const idx = state.metaConditionEvents.findIndex((c) => c.id === id);
			if (idx > -1) {
				Object.assign(state.metaConditionEvents[idx], part);
			}
		}),

	removeMetaConditionEvent: (id: number) =>
		set((state: State) => {
			state.metaConditionEvents = state.metaConditionEvents.filter(
				(c) => c.id !== id,
			);
		}),
});
