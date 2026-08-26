import { describe, expect, it, test } from "vitest";

import type { RawDiary } from "../../../../store";
import { buildWorkbook } from "../gridsAndExports/buildWorkbook";
import { toDiaryRows } from "../gridsAndExports/diaryColumns";

test("buildWorkbook", async () => {
	const diary: Array<RawDiary> = [
		{
			Category: "Kategorie",
			Date: new Date(2024, 1, 1, 12, 0),
			Severity: "3",
			Type: "Essen",
			What: "Nudeln",
		},
	];

	const book = await buildWorkbook(diary);

	expect(book.Sheets.Tagebuch).toBeDefined();
	const sheet = book.Sheets.Tagebuch;

	const expectedColumns = [
		{ cell: "A1", value: "Typ" },
		{ cell: "B1", value: "Datum" },
		{ cell: "C1", value: "Schwere" },
		{ cell: "D1", value: "Inhalt" },
		{ cell: "E1", value: "Kategorie" },
	];
	expectedColumns.forEach(({ cell, value }) => {
		expect(sheet[cell].v).toBe(value);
	});

	const expectedContent = [
		{ cell: "A2", value: "Essen" },
		{ cell: "B2", value: new Date(2024, 1, 1, 12, 0) },
		{ cell: "C2", value: "3" },
		{ cell: "D2", value: "Nudeln" },
		{ cell: "E2", value: "Kategorie" },
	];
	expectedContent.forEach(({ cell, value }) => {
		expect(sheet[cell].v).toStrictEqual(value);
	});

	const dateFormat = { cell: "B2", format: "dd.mm.yyyy hh:mm" };
	expect(sheet[dateFormat.cell].z).toBe(dateFormat.format);
});

describe("toDiaryRows", () => {
	it("Two entries", () => {
		const diaries = [
			{
				Category: "Cat",
				Date: new Date("2026-08-23T21:32:12Z"),
				Severity: "3",
				Type: "Essen",
				What: "Spargel",
			},
			{
				Category: "Dog",
				Date: new Date("2026-05-12T12:00:10Z"),
				Severity: "Very",
				Type: "Medikament",
				What: "Ascorbin",
			},
		] satisfies Array<RawDiary>;

		const rows = toDiaryRows(diaries);
		expect(rows).toHaveLength(2);
		expect(rows[0]).toMatchObject({
			id: 0,
			type: "Essen",
			date: new Date("2026-08-23T21:32:12Z"),
			severity: "3",
			what: "Spargel",
			category: "Cat",
		});
		expect(rows[1]).toMatchObject({
			id: 1,
			type: "Medikament",
			date: new Date("2026-05-12T12:00:10Z"),
			severity: "Very",
			what: "Ascorbin",
			category: "Dog",
		});
	});
});
