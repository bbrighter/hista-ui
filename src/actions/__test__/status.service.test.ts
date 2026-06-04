import dayjs from "dayjs";
import { beforeEach, describe, expect, it } from "vitest";

import type { hista } from "../../api/generatedApi";
import useHista from "../../store/store";
import { actions } from "..";
import { respToStatuses } from "../status.actions";

describe("status service", () => {
	beforeEach(async () => {
		await actions.status.list();
	});

	it("get", async () => {
		const { statuses, loaded } = useHista.getState();
		expect(statuses).toHaveLength(2);
		expect(statuses).toContainEqual({
			id: 1,
			date: dayjs("2024-01-01T13:00:00Z"),
			morningFitness: 3,
			morningSleep: 2,
			eveningFitness: 1,
			locked: true,
		});
		expect(statuses).toContainEqual({
			id: 2,
			date: dayjs("2023-01-01T14:00:00Z"),
			morningFitness: 3,
			morningSleep: 1,
			eveningFitness: null,
			locked: true,
		});
		expect(loaded.statuses).toBeTruthy();
	});

	it("delete", async () => {
		await actions.status.delete(1);

		const { statuses } = useHista.getState();
		expect(statuses).toHaveLength(1);
		expect(statuses[0].id).toBe(2);
	});

	it("create", async () => {
		await actions.status.post(dayjs());

		const { statuses } = useHista.getState();
		expect(statuses).toHaveLength(3);
		expect(statuses.some((s) => s.id === 3)).toBeTruthy();
	});

	it("patch", async () => {
		await actions.status.patch(2, {
			date: dayjs(),
			eveningFitness: 2,
			statusId: 2,
		});

		const { statuses } = useHista.getState();
		expect(statuses).toHaveLength(2);
		const status = statuses.find((s) => s.id === 2);
		expect(status?.eveningFitness).toBe(2);
		expect(status?.morningFitness).toBe(3);
	});
});

describe("response to status", () => {
	it("response to status", () => {
		const resp = {
			statuses: [
				{
					id: 1,
					morningSleep: 2,
					morningFitness: null,
					date: "2026-05-01T19:18:25.227+02:00",
				},
			],
		} satisfies hista.StatusListResponse;

		const statuses = respToStatuses(resp);
		expect(statuses).toHaveLength(1);
		const status = statuses[0];
		expect(status.id).toBe(1);
		expect(status.date.year()).toBe(2026);
		expect(status.date.month()).toBe(4);
		expect(status.date.date()).toBe(1);
		expect(status.eveningFitness).toBeNull();
		expect(status.morningFitness).toBeNull();
		expect(status.morningSleep).toBe(2);
		expect(status.locked).toBeTruthy();
	});

	it("today is not locked, others are", () => {
		const today = dayjs();
		const resp = {
			statuses: [
				{ id: 1, date: today.toISOString() },
				{ id: 2, date: "2026-05-01T19:18:25.227+02:00" },
			],
		} satisfies hista.StatusListResponse;

		const statuses = respToStatuses(resp);
		expect(statuses).toHaveLength(2);
		expect(statuses.find((s) => s.id === 1)?.locked).toBeFalsy();
		expect(statuses.find((s) => s.id === 2)?.locked).toBeTruthy();
	});

	it("empty response handled", () => {
		const resp = {} as hista.StatusListResponse;
		const status = respToStatuses(resp);
		expect(status).toHaveLength(0);
	});
});
