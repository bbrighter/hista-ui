import type { hista } from "@/api/generatedApi";

export const createStatus = (
	override: Partial<hista.StatusResponse> = {},
): hista.StatusResponse => ({
	id: 1,
	date: "2024-01-01T00:00:00Z",
	...override,
});

export const createStatusList = (
	replace?: Array<hista.StatusResponse> | Partial<hista.StatusResponse>,
): hista.StatusListResponse => ({
	statuses: replace
		? Array.isArray(replace)
			? replace
			: [createStatus(replace)]
		: [],
});
