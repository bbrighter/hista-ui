import type { hista } from "@/api/generatedApi";

export const createStatus = (
	override: Partial<hista.StatusResponse> = {},
): hista.StatusResponse => ({
	id: 1,
	date: "01-01-2024",
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
