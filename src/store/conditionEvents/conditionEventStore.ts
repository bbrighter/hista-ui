import type { StateCreator } from "zustand";

import type {
	ConditionEventStore,
	NonFunctionProperties,
	StoreType,
} from "../store.type";
import type { Condition, ConditionEvent } from "../types";

type State = NonFunctionProperties<ConditionEventStore>;

const initialState: State = {
	conditionEvent: {
		id: 0,
		date: new Date(),
		conditions: [],
	},
};

export const createConditionSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	ConditionEventStore
> = (set) => ({
	...initialState,

	resetConditionEvent: () => set(initialState),

	setConditionEvent: (event: ConditionEvent) =>
		set((state: State) => {
			state.conditionEvent = event;
		}),

	updateConditionEvent: (id: number, part: Partial<ConditionEvent>) =>
		set((state: ConditionEventStore) => {
			if (state.conditionEvent.id === id) {
				Object.assign(state.conditionEvent, part);
			}
		}),

	removeCondition: (conditionId: number) =>
		set((state: State) => {
			state.conditionEvent.conditions = state.conditionEvent.conditions.filter(
				(c) => c.id !== conditionId,
			);
		}),

	addCondition: (cond: Condition) =>
		set((state: State) => {
			state.conditionEvent.conditions.push(cond);
		}),

	updateCondition: (conditionId: number, part: Partial<Condition>) =>
		set((state: State) => {
			const idx = state.conditionEvent.conditions.findIndex(
				(c) => c.id === conditionId,
			);
			if (idx === -1) return;

			Object.assign(state.conditionEvent.conditions[idx], part);
		}),
});
