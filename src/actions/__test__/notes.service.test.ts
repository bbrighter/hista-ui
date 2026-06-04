import { beforeEach, describe, expect, it, vi } from "vitest";
import { client } from "../../api/api";
import useHista from "../../store/store";
import { notes as notesActions } from "../notes.actions";

describe("notes actions", () => {
	const spyList = vi.spyOn(client, "ListNotes");
	const oldDate = new Date("2024-01-31T12:00:00Z");

	beforeEach(async () => {
		await notesActions.list();
	});
	it("List notes", async () => {
		const { notes, loaded } = useHista.getState();

		expect(loaded.notes).toBeTruthy();
		expect(Object.values(notes)).toHaveLength(1);
		expect(notes[1]).toStrictEqual({
			id: 1,
			text: "text",
			date: oldDate,
		});
	});

	it("Listing notes loads only once", async () => {
		await notesActions.list();
		expect(spyList).toHaveBeenCalledOnce();
	});

	it("Post a new note", async () => {
		await notesActions.post();

		const { notes } = useHista.getState();
		expect(notes[1]).toBeDefined();
	});

	it("Patch note text", async () => {
		await notesActions.patchText(1, "new text");

		const { notes } = useHista.getState();
		expect(notes[1].text).toBe("new text");
		expect(notes[1].date).toStrictEqual(oldDate);
	});

	it("Patch note date", async () => {
		const newDate = new Date("2020-01-01T10:00:00Z");

		await notesActions.patchDate(1, newDate);

		const { notes } = useHista.getState();
		expect(notes[1].text).toBe("text");
		expect(notes[1].date).toStrictEqual(newDate);
	});

	it("Delete note", async () => {
		await notesActions.delete(1);

		const { notes } = useHista.getState();
		expect(Object.values(notes)).toHaveLength(0);
	});

	it("Delete non-exisiting note", async () => {
		await notesActions.delete(10);

		const { notes } = useHista.getState();
		expect(Object.values(notes)).toHaveLength(1);
	});
});
