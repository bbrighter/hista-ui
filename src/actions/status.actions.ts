import dayjs, { type Dayjs } from "dayjs";

import { client } from "../api/api";
import type { hista } from "../api/generatedApi";
import type { PutStatusParams, Status } from "../store";
import useHista from "../store/store";

export const status = {
	list: async () => {
		const { setStatuses, loaded, setLoaded } = useHista.getState();
		if (loaded.statuses) return;

		const resp = await client.ListStatus();

		setStatuses(respToStatuses(resp));
		setLoaded("statuses");
	},

	post: async (date: Dayjs): Promise<number> => {
		const resp = await client.PostStatus({ date: date.toISOString() });

		const { addStatus } = useHista.getState();
		addStatus(respToStatus(resp));
		return resp.id;
	},

	delete: async (id: number) => {
		await client.DeleteStatus(id);

		const { removeStatus } = useHista.getState();
		removeStatus(id);
	},

	patch: async (id: number, params: PutStatusParams) => {
		await client.PatchStatus(id, {
			date: params.date.toISOString(),
			eveningFitness: params.eveningFitness,
			morningFitness: params.morningFitness,
			morningSleep: params.morningSleep,
			depressive: params.depressive,
			tense: params.tense,
			moodSwings: params.moodSwings,
			irritable: params.irritable,
			lossOfInterest: params.lossOfInterest,
			concentrationProblems: params.concentrationProblems,
			lackOfDrive: params.lackOfDrive,
			appetiteChanges: params.appetiteChanges,
			sleepProblems: params.sleepProblems,
			overwhelmed: params.overwhelmed,
		});

		const { updateStatus } = useHista.getState();
		updateStatus(id, params);
	},
};

export const respToStatuses = (
	resp: hista.StatusListResponse,
): Array<Status> => {
	if (!resp?.statuses) return []; // This ensure that the initial loading works
	return resp.statuses.map((s) => {
		return respToStatus(s);
	});
};

const respToStatus = (resp: hista.StatusResponse): Status => {
	return {
		id: resp.id,
		date: dayjs(resp.date),
		morningFitness: resp?.morningFitness ?? null,
		morningSleep: resp?.morningSleep ?? null,
		eveningFitness: resp?.eveningFitness ?? null,
		depressive: resp?.depressive ?? null,
		tense: resp?.tense ?? null,
		moodSwings: resp?.moodSwings ?? null,
		irritable: resp?.irritable ?? null,
		lossOfInterest: resp?.lossOfInterest ?? null,
		concentrationProblems: resp?.concentrationProblems ?? null,
		lackOfDrive: resp?.lackOfDrive ?? null,
		appetiteChanges: resp?.appetiteChanges ?? null,
		sleepProblems: resp?.sleepProblems ?? null,
		overwhelmed: resp?.overwhelmed ?? null,
	};
};
