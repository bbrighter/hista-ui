import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import useHista from "@/store/store";
import {
	headacheExcelRows,
	useHeadacheGridRows,
} from "../gridsAndExports/headacheColumns";

const headache = {
	id: 1,
	date: new Date("2022-08-23T20:37:00Z"),
	description: "Description",
	severity: 3,
	positions: [],
	symptoms: [],
	types: [],
};

describe("useHeadacheGridRows", () => {
	beforeEach(() => {
		useHista.getState().resetHeadaches();
	});

	it("Headaches with no array", () => {
		const { setHeadaches } = useHista.getState();
		setHeadaches({ 1: headache });

		const { result } = renderHook(() => useHeadacheGridRows());
		expect(result.current).toHaveLength(1);
		expect(result.current[0]).toMatchObject({
			id: 1,
			date: new Date("2022-08-23T20:37:00.000Z"),
			description: "Description",
			severity: 3,
		});

		for (const [key, value] of Object.entries(result.current[0])) {
			if (["id", "date", "severity", "description"].includes(key)) continue;

			expect(value).toBeNull();
		}
	});

	it("Headaches with arrays", () => {
		const { setHeadaches } = useHista.getState();
		setHeadaches({
			1: {
				...headache,
				types: [{ label: "Stechend", value: "stabbing" }],
				positions: [{ label: "Oben", value: "top" }],
				symptoms: [
					{ label: "Tinnitius", value: "tinnitus" },
					{ label: "Schwindel", value: "dizziness" },
				],
			},
		});

		const { result } = renderHook(() => useHeadacheGridRows());

		expect(result.current).toHaveLength(1);
		expect(result.current[0]).toMatchObject({
			id: 1,
			date: new Date("2022-08-23T20:37:00.000Z"),
			description: "Description",
			severity: 3,
			stabbing: "✓",
			top: "✓",
			tinnitus: "✓",
			dizziness: "✓",
		});

		for (const [key, value] of Object.entries(result.current[0])) {
			if (
				[
					"id",
					"date",
					"description",
					"severity",
					"stabbing",
					"top",
					"tinnitus",
					"dizziness",
				].includes(key)
			)
				continue;

			expect(value).toBeNull();
		}
	});
});

describe("headacheExcelRows", () => {
	it("Normal", () => {
		const rows = headacheExcelRows([
			{
				...headache,
				positions: [{ value: "top", label: "Oben" }],
				types: [{ value: "dull-pressing", label: "Dumpf-drückend" }],
				symptoms: [{ value: "short-term memory", label: "Kurzzeitgedächtnis" }],
			},
		]);
		expect(rows).toHaveLength(1);
		expect(rows[0]).toStrictEqual([
			new Date("2022-08-23T20:37:00.000Z"),
			3,
			null,
			null,
			"✓",
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			"✓",
			null,
			"✓",
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			"Description",
		]);
	});
});
