import { expect, test } from "vitest";

import type { Headache } from "../../../../store";
import { buildHeadacheWorkbook } from "./headacheExport";

test("headache workbook", async () => {
	const headaches: Array<Headache> = [
		{
			date: new Date(2024, 1, 1, 12, 0),
			description: "desc",
			id: 1,
			positions: [{ value: "left", label: "Links" }],
			severity: 3,
			symptoms: [
				{ value: "short-term memory", label: "Kurzzeitgedächtnis" },
				{ value: "tinnitus", label: "Tinnitus" },
			],
			types: [{ value: "stabbing", label: "Stechend" }],
		},
	];

	const book = buildHeadacheWorkbook(headaches);
	const sheet = book.Sheets.Kopfschmerz;
	expect(sheet).toBeDefined();

	const expectedColumnHeaders = [
		{ cell: "A2", header: "Zeit" },
		{ cell: "B2", header: "Schwere" },
		{ cell: "C1", header: "Position" },
		{ cell: "N1", header: "Position" },
		{ cell: "O1", header: "Typen" },
		{ cell: "Q1", header: "Typen" },
		{ cell: "R1", header: "Symptome" },
		{ cell: "AD1", header: "Symptome" },
		{ cell: "AE2", header: "Beschreibung" },
	];
	expectedColumnHeaders.forEach((h) => {
		expect(sheet[h.cell].v).toBe(h.header);
	});

	const expectedColumnValues = [
		{ cell: "A3", value: "2/1/24", getter: "w" }, // Date, formatted in w
		{ cell: "A3", value: 45323.5 }, // Date, formatted in w
		{ cell: "B3", value: 3 }, // Severity
		{ cell: "C3", value: "✓" }, // Position left
		{ cell: "D3", value: null }, // Position right
		{ cell: "O3", value: null }, // Type pulsating-pounding
		{ cell: "Q3", value: "✓" }, // Type stabbing
		{ cell: "R3", value: "✓" }, // Symptom short-term-memory
		{ cell: "S3", value: "✓" }, // Symptom tinnitus
		{ cell: "U3", value: null }, // Symptom light-sensitive
		{ cell: "AE3", value: "desc" }, // Description
	];
	expectedColumnValues.forEach((v) => {
		const cellValue = sheet[v.cell] ? sheet[v.cell][v.getter ?? "v"] : null;
		expect(cellValue).toBe(v.value);
	});

	expect(sheet.A3.z).toBe("dd.mm.yyyy hh:mm");
});
