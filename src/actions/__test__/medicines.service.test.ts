import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createIntakeList,
	createMedicineList,
} from "@/__tests__/fixtures/medicines";
import { PIID } from "@/__tests__/fixtures/piid";
import {
	getIntakeListHandler,
	getMedicineListHandler,
	postMedicineHandler,
} from "@/__tests__/mocks/medicineHandlers";
import { server } from "@/__tests__/setupTest";
import { client } from "../../api/api";
import useHista from "../../store/store";
import { actions } from "..";

describe("medicines service, manage medicines", () => {
	const spyPatch = vi.spyOn(client, "PatchMedicine");
	const spyListMedicines = vi.spyOn(client, "ListMedicines");

	beforeEach(async () => {
		const { setMedicines, resetLoaded } = useHista.getState();
		resetLoaded();
		setMedicines([{ id: 1, isArchived: false, name: "Medicine" }]);
	});

	it("list medicines", async () => {
		server.use(
			getMedicineListHandler(
				createMedicineList([
					{ id: 1, isArchived: false, name: "Medicine", sortOrder: 1 },
					{ id: 2, isArchived: true, name: "Archived medicine", sortOrder: 2 },
				]),
			),
		);
		await actions.medicines.list();
		const { medicines, loaded } = useHista.getState();
		expect(medicines).toHaveLength(2);
		expect(loaded.medicines).toBeTruthy();
		expect(medicines).toContainEqual({
			id: 1,
			isArchived: false,
			name: "Medicine",
		});
		expect(medicines).toContainEqual({
			id: 2,
			isArchived: true,
			name: "Archived medicine",
		});
	});

	it("list medicines only called once", async () => {
		await actions.medicines.list();
		await actions.medicines.list();

		expect(spyListMedicines).toHaveBeenCalledOnce();
	});

	it("create medicine", async () => {
		server.use(postMedicineHandler(3));
		await actions.medicines.create("new medicine");

		const { medicines } = useHista.getState();
		expect(medicines).toHaveLength(2);
		expect(medicines).toContainEqual({
			id: 3,
			isArchived: false,
			name: "new medicine",
		});
		expect(medicines[0].id).toBe(3);
	});

	describe("reorder medicine", () => {
		beforeEach(() => {
			const { setMedicines } = useHista.getState();
			setMedicines([
				{ id: 1, isArchived: false, name: "Medicine 1" },
				{ id: 2, isArchived: false, name: "Medicine 2" },
				{ id: 3, isArchived: false, name: "Medicine 3" },
			]);
		});
		it("reorder to first", async () => {
			await actions.medicines.reorder(2, undefined, 1);

			const { medicines } = useHista.getState();
			expect(medicines[0].id).toBe(2);
			expect(medicines[1].id).toBe(1);
			expect(medicines[2].id).toBe(3);
		});
		it("reorder to last", async () => {
			await actions.medicines.reorder(2, 3);

			const { medicines } = useHista.getState();
			expect(medicines[0].id).toBe(1);
			expect(medicines[1].id).toBe(3);
			expect(medicines[2].id).toBe(2);
		});
		it("reorder", async () => {
			await actions.medicines.reorder(1, 2, 3);

			const { medicines } = useHista.getState();
			expect(medicines[0].id).toBe(2);
			expect(medicines[1].id).toBe(1);
			expect(medicines[2].id).toBe(3);
		});
		it("reorder with no effect", async () => {
			await actions.medicines.reorder(2, 1, 3);

			const { medicines } = useHista.getState();
			expect(medicines[0].id).toBe(1);
			expect(medicines[1].id).toBe(2);
			expect(medicines[2].id).toBe(3);
		});
	});

	it("archive medicine", async () => {
		await actions.medicines.archive(1);
		expect(spyPatch).toHaveBeenCalledWith(PIID, 1, { archive: true });

		const { medicines } = useHista.getState();
		expect(medicines.find((i) => i.id === 1)?.isArchived).toBeTruthy();
	});

	it("rename medicine", async () => {
		await actions.medicines.rename(1, "new name");
		expect(spyPatch).toHaveBeenCalledWith(PIID, 1, { name: "new name" });

		const { medicines } = useHista.getState();
		expect(medicines.find((i) => i.id === 1)?.name).toBe("new name");
	});
});

describe("medicines service, edit intakes", () => {
	const sypListIntakes = vi.spyOn(client, "ListIntakes");

	it("List intakes", async () => {
		server.use(
			getIntakeListHandler(
				createIntakeList([
					{
						medicineId: 1,
						count: 3,
						date: "2022-04-03T12:30:00Z",
					},
				]),
			),
		);

		await actions.intakes.list();

		const { intakes } = useHista.getState();
		expect(intakes).toHaveLength(1);
		expect(intakes[0]).toMatchObject({
			medicineId: 1,
			count: 3,
			date: new Date("2022-04-03T12:30:00Z"),
		});
	});

	it("List intakes is called only once", async () => {
		await actions.intakes.list();
		await actions.intakes.list();

		expect(sypListIntakes).toHaveBeenCalledOnce();
	});

	it("Increment intake", async () => {
		const { setIntakes } = useHista.getState();
		const now = new Date();
		const oldDate = new Date("2025-06-06T00:00:00Z");
		setIntakes([
			{ medicineId: 1, count: 3, date: now },
			{ medicineId: 1, count: 1, date: oldDate },
		]);

		await actions.intakes.increment(1);

		const { intakes } = useHista.getState();
		expect(intakes).toContainEqual({ medicineId: 1, count: 4, date: now });
		expect(intakes).toContainEqual({ medicineId: 1, count: 1, date: oldDate });
	});

	it("Increment, but no intake exists before", async () => {
		vi.useFakeTimers();
		const fixedDate = new Date();
		vi.setSystemTime(fixedDate);

		const { setIntakes } = useHista.getState();
		const oldDate = new Date("2025-06-06T00:00:00Z");
		setIntakes([{ medicineId: 1, count: 10, date: oldDate }]);

		await actions.intakes.increment(1);

		const { intakes } = useHista.getState();
		expect(intakes).toContainEqual({
			medicineId: 1,
			count: 1,
			date: fixedDate,
		});
		vi.useRealTimers();
	});

	it("Decrement intake", async () => {
		const { setIntakes } = useHista.getState();
		const now = new Date();
		const oldDate = new Date("2025-06-06T00:00:00Z");
		setIntakes([
			{ medicineId: 1, count: 3, date: now },
			{ medicineId: 1, count: 1, date: oldDate },
		]);

		await actions.intakes.decrement(1);

		const { intakes } = useHista.getState();
		expect(intakes).toContainEqual({ medicineId: 1, count: 2, date: now });
		expect(intakes).toContainEqual({ medicineId: 1, count: 1, date: oldDate });
	});
});
