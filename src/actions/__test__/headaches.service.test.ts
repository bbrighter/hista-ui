import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHeadache } from "@/__tests__/fixtures/headache";
import {
	getHeadacheHandler,
	getHeadacheListHandler,
	postHeadacheHandler,
} from "@/__tests__/mocks/headacheHandlers";
import { server } from "@/__tests__/setupTest";
import { client } from "../../api/api";
import useHista from "../../store/store";
import { actions } from "..";

describe("headache service", () => {
	beforeEach(async () => {
		const store = useHista.getState();
		store.resetHeadaches();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("Getting sets loaded", async () => {
		const loaded = useHista.getState().loaded;
		expect(loaded.headaches).toBeFalsy();
		expect(loaded.headache).toBeFalsy();

		await actions.headaches.list();

		const headachesLoaded = useHista.getState().loaded;
		expect(headachesLoaded.headaches).toBeTruthy();
		expect(headachesLoaded.headache).toBeFalsy();

		await actions.headaches.get(1);

		const headacheLoaded = useHista.getState().loaded;
		expect(headacheLoaded.headaches).toBeTruthy();
		expect(headacheLoaded.headache).toBeTruthy();
	});

	it("get headaches", async () => {
		server.use(
			getHeadacheListHandler(
				createHeadache({
					id: 1,
					date: "2022-01-01T00:00:00Z",
					description: "description",
					positions: ["top", "bottom"],
					symptoms: ["severe", "whatever"],
					types: ["stabbing"],
				}),
			),
		);
		await actions.headaches.list();

		const headaches = useHista.getState().headaches;
		expect(Object.values(headaches)).toHaveLength(1);
		const headache = headaches[1];
		expect(headache.date).toStrictEqual(new Date("2022-01-01T00:00:00Z"));
		expect(headache.id).toStrictEqual(1);
		expect(headache.description).toStrictEqual("description");
		expect(headache.positions).toHaveLength(2);
		expect(headache.symptoms).toHaveLength(2);
		expect(headache.types).toHaveLength(1);
		expect(headache.types[0]).toStrictEqual({
			label: "Stechend",
			value: "stabbing",
		});
	});

	it("get one headache", async () => {
		server.use(
			getHeadacheHandler(
				createHeadache({ id: 1, severity: 3, description: "description" }),
			),
		);

		await actions.headaches.get(1);

		const headache = useHista.getState().headache;
		expect(headache.id).toBe(1);
		expect(headache.severity).toBe(3);
		expect(headache.description).toBe("description");
	});

	it("posts a new headache", async () => {
		vi.useFakeTimers();
		vi.setSystemTime("2025-03-08");
		server.use(postHeadacheHandler(2));
		const id = await actions.headaches.post();

		expect(id).toBe(2);
		expect(Object.keys(useHista.getState().headaches)).toHaveLength(1);
		const headache = useHista.getState().headaches[2];
		expect(headache.id).toBe(2);
		expect(headache.severity).toBe(5);
		expect(headache.date).toStrictEqual(new Date("2025-03-08"));
	});

	it("deletes a headache", async () => {
		await actions.headaches.delete(1);

		expect(Object.keys(useHista.getState().headaches)).toHaveLength(0);
	});
});

describe("Single headache actions", () => {
	const spyPatchTypes = vi.spyOn(client, "PatchHeadache");
	beforeEach(async () => {
		const store = useHista.getState();
		store.resetLoaded();
		store.resetHeadaches();

		const headache = createHeadache({ id: 1, positions: ["left", "right"] });
		server.use(getHeadacheHandler(headache), getHeadacheListHandler(headache));
		await actions.headaches.list();
		await actions.headaches.get(1);
	});

	it("patch headache date", async () => {
		await actions.headaches.patchDate(1, dayjs(new Date(2024, 4, 15, 2, 30)));

		const { headache, headaches } = useHista.getState();
		expect(headache.date).toStrictEqual(new Date(2024, 4, 15, 2, 30));
		expect(headaches[1].date).toStrictEqual(new Date(2024, 4, 15, 2, 30));
	});

	it("patch headache position", async () => {
		await actions.headaches.patchPositions(1, [
			{ value: "left", label: "Links" },
		]);

		const { headache, headaches } = useHista.getState();
		expect(headache.positions).toStrictEqual([
			{ value: "left", label: "Links" },
		]);
		expect(headaches[1].positions).toStrictEqual([
			{ value: "left", label: "Links" },
		]);
	});

	it("patch headache position, no changes", async () => {
		await actions.headaches.patchPositions(1, [
			{ value: "left", label: "Links" },
			{ value: "right", label: "Rechts" },
		]);

		expect(spyPatchTypes).not.toHaveBeenCalled();
	});

	it("patch headache symptoms", async () => {
		await actions.headaches.patchSymptoms(1, [
			{ value: "dizziniess", label: "Schwindel" },
		]);

		expect(useHista.getState().headache.symptoms).toStrictEqual([
			{ value: "dizziniess", label: "Schwindel" },
		]);
	});
});
