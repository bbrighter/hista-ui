import type { hista } from "@/api/generatedApi";

export type Entity = "statuses" | "headaches";

export type Meta = {
	entitiesFilled: Record<Entity, boolean>;
};

export const respToMeta = (resp: hista.MetaResponse): Meta => {
	const entitiesFilled: Record<Entity, boolean> = {
		statuses: false,
		headaches: false,
	};
	resp.entitiesFilled.forEach((e) => {
		entitiesFilled[e.entity as Entity] = e.filled;
	});
	return { entitiesFilled };
};
