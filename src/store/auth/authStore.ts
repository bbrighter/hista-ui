import type { StateCreator } from "zustand";

import type {
	AuthStore,
	NonFunctionProperties,
	StoreType,
} from "../store.type";
import type { Instance } from "./instance";
import type { User } from "./users";

type State = NonFunctionProperties<AuthStore>;

const initialState = {
	instances: [],
	token: window.localStorage.getItem("token") || "",
	piid: null,
	userName: "",
	users: [],
	instancesAreLoaded: false,
} satisfies State;

export const createAuthSlice: StateCreator<
	StoreType,
	[["zustand/immer", never]],
	[],
	AuthStore
> = (set) => ({
	...initialState,

	setPiid(piid: string) {
		set((state: State) => {
			state.piid = piid;
		});
	},

	setToken(token: string) {
		window.localStorage.setItem("token", token);
		set((state: State) => {
			state.token = token;
		});
	},

	setUserName: (name: string) => {
		set((state: State) => {
			state.userName = name;
		});
	},

	setUsers: (users: Array<User>) => {
		set((state: State) => {
			state.users = users;
		});
	},

	setInstances: async (instances: Array<Instance>) => {
		set((state: State) => {
			state.instances = instances;
		});
	},

	setInstancesLoaded: (isLoaded: boolean) => {
		set((state: State) => {
			state.instancesAreLoaded = isLoaded;
		});
	},
});
