import { utils, type WorkBook } from "xlsx";

import useHista from "../../../../store/store";

export const useBuildWorkBook = (): (() => WorkBook) => {
	const diary = useHista((state) => state.diaryEntries);
	const diaryWithHeaderNames = diary.map((d) => ({
		Typ: d.Type,
		Datum: d.Date,
		Schwere: d.Severity,
		Inhalt: d.What,
		Kategorie: d.Category,
	}));
	const worksheet = utils.json_to_sheet(diaryWithHeaderNames, {
		cellDates: true,
	});
	const dateRange = { s: { c: 1, r: 0 }, e: { c: 1, r: 64000 } };
	for (let R = dateRange.s.r; R < dateRange.e.r; R++) {
		const cellAddress = { r: R, c: dateRange.s.c };
		const cellRef = utils.encode_cell(cellAddress);
		if (!worksheet[cellRef]) continue;
		worksheet[cellRef].z = "dd.mm.yyyy hh:mm";
	}
	const workbook = utils.book_new();
	utils.book_append_sheet(workbook, worksheet, "Tagebuch");

	return () => workbook;
};
