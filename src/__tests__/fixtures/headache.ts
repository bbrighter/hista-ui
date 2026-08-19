import type { hista } from "@/api/generatedApi";

const headacheResponse = {
	id: 1,
	date: "2022-01-01T00:00:00Z",
	description: "Description",
	severity: 1,
} satisfies hista.HeadacheResponse;

export const createHeadache = (
	override: Partial<hista.HeadacheResponse> = {},
): hista.HeadacheResponse => ({
	...headacheResponse,
	...override,
});

export const createHeadacheList = (
	values: Array<hista.HeadacheResponse> | Partial<hista.HeadacheResponse>,
): hista.HeadacheListResponse => ({
	headaches: Array.isArray(values) ? values : [createHeadache(values)],
});
