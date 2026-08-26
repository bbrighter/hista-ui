import type { hista } from "@/api/generatedApi";

export const createDiaries = (
	resp: Array<hista.DiaryResp> | Partial<hista.DiaryResp>,
): hista.DiaryRespList => ({
	diaries: Array.isArray(resp) ? resp : [createDiary(resp)],
});

const createDiary = (resp: Partial<hista.DiaryResp> = {}): hista.DiaryResp => ({
	category: "Category",
	content: "Content",
	date: "2026-08-26T11:50:00Z",
	severity: "3",
	type: "Type",
	...resp,
});
