import type { hista } from "@/api/generatedApi";

export type Entity = "statuses" | "headaches";

export type AppInfo = {
	entitiesFilled: Record<Entity, boolean>;
};

export const respToAppInfo = (resp: hista.MetaResponse): AppInfo => {
	const entitiesFilled: Record<Entity, boolean> = {
		statuses: false,
		headaches: false,
	};
	resp.entitiesFilled.forEach((e) => {
		entitiesFilled[e.entity as Entity] = e.filled;
	});
	return { entitiesFilled };
};
