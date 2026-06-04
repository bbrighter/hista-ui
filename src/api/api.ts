/** biome-ignore-all lint/suspicious/noExplicitAny: Generic functions */
import { fetcher } from "./fetcher";
import Client, { type ClientOptions, Local } from "./generatedApi";

const baseUrl =
	import.meta.env.MODE === "test"
		? "http://localhost:4444"
		: import.meta.env.PROD
			? "/api"
			: Local;

const options: ClientOptions = {
	fetcher: fetcher,
	auth: () => ({ Token: window.localStorage.getItem("token") || "" }),
};

const baseClient = new Client(baseUrl, options);
export const authApi = baseClient.authentication;

type DropFirstArg<F> = F extends (first: any, ...rest: infer R) => infer Ret
	? (...args: R) => Ret
	: F;

type PiidInjectedClient<T> = {
	[K in keyof T]: DropFirstArg<T[K]>;
};

let getPiid: (() => string | null) | null = null;
export const injectPiidGetter = (getter: () => string | null) => {
	getPiid = getter;
};

export const client: PiidInjectedClient<typeof baseClient.hista> = new Proxy(
	baseClient.hista,
	{
		get(target, prop, receiver) {
			const orig = Reflect.get(target, prop, receiver);

			if (typeof orig !== "function") {
				return orig;
			}

			return (...args: any[]) => {
				const piid = getPiid?.();
				if (!piid) return;
				return orig.call(target, piid, ...args);
			};
		},
	},
) as any;
