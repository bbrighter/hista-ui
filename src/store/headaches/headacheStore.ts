import type { StateCreator } from "zustand";

import type {
	HeadacheStore,
	NonFunctionProperties,
	StoreType,
} from "../store.type";
import type { Headache } from "../types/headaches.types";

type State = NonFunctionProperties<HeadacheStore>;

const initialState = (): State => ({
	headaches: {},
	headache: {
		id: 0,
		date: new Date(),
		positions: [],
		symptoms: [],
		types: [],
		severity: 0,
		description: "",
	},
});

export const createHeadacheSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	HeadacheStore
> = (set) => ({
	...initialState(),

	resetHeadaches: () => set(initialState()),

	addHeadache: (id: number, h: Headache) =>
		set((state) => {
			state.headaches[id] = h;
		}),
	removeHeadache: (id: number) =>
		set((state) => {
			state.headaches = Object.fromEntries(
				Object.entries(state.headaches).filter(([i]) => Number(i) !== id),
			);
		}),

	setHeadache: (headache: Headache) =>
		set((state) => {
			state.headache = headache;
		}),
	setHeadaches: (headaches: Record<number, Headache>) =>
		set((state) => {
			state.headaches = headaches;
		}),
	updateHeadache: (id: number, part: Partial<Headache>) =>
		set((state) => {
			Object.assign(state.headache, part);

			const existing = state.headaches[id];
			if (existing) {
				Object.assign(existing, part);
			}
		}),
});
