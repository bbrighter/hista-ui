import type { hista } from "@/api/generatedApi";

export const createTestStatus = (
	override: Partial<hista.StatusResponse> = {},
): hista.StatusResponse => ({
	id: 1,
	date: "01-01-2024",
	...override,
});

export const createTestStatusList = (
	replace?: Array<hista.StatusResponse>,
): hista.StatusListResponse => ({
	statuses: replace ? replace : [createTestStatus()],
});
