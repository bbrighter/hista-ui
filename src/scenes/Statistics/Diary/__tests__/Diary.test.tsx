import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { getDiariesHandler } from "@/__tests__/mocks/statisticsHandler";
import { server } from "@/__tests__/setupTest";
import { Diary } from "../Diary";

describe("Diary integration", () => {
	const allTypeDiaries = [
		{
			date: "2026-02-14T16:52:46Z",
			type: "Pollen",
			content: "",
			severity: "Geringe",
			category: "Hasel",
		},
		{
			date: "2026-02-14T09:55:12Z",
			type: "Symptom",
			content: "Kopfweh",
			severity: "0",
			category: "Kopf",
		},
		{
			date: "2026-02-14T09:54:55Z",
			type: "Food",
			content: "Zucchini",
			severity: "cooked",
			category: "",
		},
		{
			date: "2025-12-20T09:36:03Z",
			type: "Note",
			content: "Notizi",
			severity: "",
			category: "",
		},
	];

	it("Download button exists and works", async () => {
		server.use(getDiariesHandler(allTypeDiaries));
		render(<Diary />);

		const button = await screen.findByRole("button", {
			name: "Ernährungstagebuch herunterladen",
		});
		await userEvent.click(button);
		// TODO: Test that it works
	});

	it("Grid exists and is filled", async () => {
		server.use(getDiariesHandler(allTypeDiaries));
		render(<Diary />);

		const grid = await screen.findByRole("grid");
		[
			"Pollen",
			"Hasel",
			"Geringe",
			"Symptom",
			"Kopfweh",
			"Kopf",
			"0",
			"Essen",
			"Zucchini",
			"Gar",
			"Notiz",
			"Notizi",
			// TODO: Check how to validate dates. Do we even need to?
		].forEach((s) => {
			within(grid).getByRole("gridcell", { name: s });
		});
	});
});
