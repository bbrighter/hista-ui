import dayjs from "dayjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PIID } from "@/__tests__/fixtures/piid";
import { createStatus, createStatusList } from "@/__tests__/fixtures/status";
import {
	getStatusListHandler,
	postStatusHandler,
} from "@/__tests__/mocks/statusHandler";
import { server } from "@/__tests__/setupTest";
import { client } from "@/api/api";
import type { hista } from "../../api/generatedApi";
import useHista from "../../store/store";
import { actions } from "..";
import { respToStatuses } from "../status.actions";

describe("status service", () => {
	const listStatus = vi.spyOn(client, "ListStatus");
	const postStatus = vi.spyOn(client, "PostStatus");
	const patchStatus = vi.spyOn(client, "PatchStatus");
	const deleteStatus = vi.spyOn(client, "DeleteStatus");

	beforeEach(() => {
		const store = useHista.getState();
		store.resetStatuses();
		store.resetLoaded();
	});

	it("get", async () => {
		server.use(
			getStatusListHandler(
				createStatusList([
					createStatus({
						id: 1,
						morningFitness: 3,
						morningSleep: 2,
						eveningFitness: 1,
						date: "2024-01-01T13:00:00Z",
					}),
					createStatus({
						id: 2,
						morningFitness: 3,
						morningSleep: 1,
						date: "2023-01-01T14:00:00Z",
					}),
				]),
			),
		);

		await actions.status.list();
		const { statuses, loaded } = useHista.getState();
		expect(statuses).toHaveLength(2);
		expect(statuses).toContainEqual({
			id: 1,
			date: dayjs("2024-01-01T13:00:00Z"),
			morningFitness: 3,
			morningSleep: 2,
			dayFitness: null,
			eveningFitness: 1,
			appetiteChanges: null,
			concentrationProblems: null,
			depressive: null,
			irritable: null,
			lackOfDrive: null,
			lossOfInterest: null,
			moodSwings: null,
			overwhelmed: null,
			sleepProblems: null,
			tense: null,
			crash: false,
		});
		expect(statuses).toContainEqual({
			id: 2,
			date: dayjs("2023-01-01T14:00:00Z"),
			morningFitness: 3,
			morningSleep: 1,
			dayFitness: null,
			eveningFitness: null,
			appetiteChanges: null,
			concentrationProblems: null,
			depressive: null,
			irritable: null,
			lackOfDrive: null,
			lossOfInterest: null,
			moodSwings: null,
			overwhelmed: null,
			sleepProblems: null,
			tense: null,
			crash: false,
		});
		expect(loaded.statuses).toBe(true);
	});

	it("delete", async () => {
		server.use(
			getStatusListHandler(createStatusList([createStatus({ id: 1 })])),
		);
		await actions.status.list();
		await actions.status.delete(1);

		expect(deleteStatus).toHaveBeenCalledExactlyOnceWith(PIID, 1);

		const { statuses } = useHista.getState();
		expect(statuses).toHaveLength(0);
	});

	it("Delete with wrong id", async () => {
		server.use(
			getStatusListHandler(createStatusList([createStatus({ id: 1 })])),
		);

		await actions.status.list();
		await actions.status.delete(2);

		const { statuses } = useHista.getState();
		expect(statuses).toHaveLength(1);
	});

	it("create", async () => {
		const date = new Date("2021-03-12T12:13:00Z");
		server.use(postStatusHandler(createStatus({ id: 3 })));
		await actions.status.post(dayjs(date));

		expect(postStatus).toHaveBeenCalledExactlyOnceWith(PIID, {
			date: date.toISOString(),
		});

		const { statuses } = useHista.getState();
		expect(statuses).toHaveLength(1);
		expect(statuses.some((s) => s.id === 3)).toBeTruthy();
	});

	it("patch", async () => {
		const date = new Date();

		server.use(getStatusListHandler(createStatusList([createStatus()])));
		await actions.status.list();
		await actions.status.patch(1, {
			date: dayjs(date),
			eveningFitness: 2,
			dayFitness: null,
			appetiteChanges: null,
			concentrationProblems: null,
			depressive: null,
			irritable: null,
			lackOfDrive: null,
			lossOfInterest: null,
			moodSwings: null,
			morningFitness: null,
			morningSleep: null,
			overwhelmed: null,
			sleepProblems: null,
			tense: null,
			crash: false,
		});

		expect(patchStatus).toHaveBeenCalledExactlyOnceWith(PIID, 1, {
			date: date.toISOString(),
			eveningFitness: 2,
			dayFitness: null,
			appetiteChanges: null,
			concentrationProblems: null,
			depressive: null,
			irritable: null,
			lackOfDrive: null,
			lossOfInterest: null,
			moodSwings: null,
			morningFitness: null,
			morningSleep: null,
			overwhelmed: null,
			sleepProblems: null,
			tense: null,
			crash: false,
		});

		const { statuses } = useHista.getState();
		expect(statuses).toHaveLength(1);
		const status = statuses.find((s) => s.id === 1);
		expect(status?.eveningFitness).toBe(2);
		expect(status?.morningFitness).toBe(null);
	});

	it("Get only gets once", async () => {
		server.use(getStatusListHandler({ statuses: [] }));

		await actions.status.list();
		await actions.status.list();

		expect(listStatus).toHaveBeenCalledOnce();
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
					crash: false,
					appetiteChanges: null,
					concentrationProblems: 3,
					dayFitness: 1,
					depressive: null,
					eveningFitness: 5,
					irritable: 1,
					lackOfDrive: 2,
					lossOfInterest: 3,
					moodSwings: 1,
					overwhelmed: 2,
					sleepProblems: 4,
					tense: 2,
				},
			],
		} satisfies hista.StatusListResponse;

		const statuses = respToStatuses(resp);
		expect(statuses).toHaveLength(1);
		const status = statuses[0];
		expect(status).toStrictEqual({
			id: 1,
			morningSleep: 2,
			morningFitness: null,
			date: dayjs(new Date("2026-05-01T19:18:25.227+02:00")),
			crash: false,
			appetiteChanges: null,
			concentrationProblems: 3,
			dayFitness: 1,
			depressive: null,
			eveningFitness: 5,
			irritable: 1,
			lackOfDrive: 2,
			lossOfInterest: 3,
			moodSwings: 1,
			overwhelmed: 2,
			sleepProblems: 4,
			tense: 2,
		});
	});

	it("empty response handled", () => {
		const resp = {} as hista.StatusListResponse;
		const status = respToStatuses(resp);
		expect(status).toHaveLength(0);
	});
});
