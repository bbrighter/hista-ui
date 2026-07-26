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
			eveningFitness: params.eveningFitness ? params.eveningFitness : null,
			morningFitness: params.morningFitness ? params.morningFitness : null,
			morningSleep: params.morningSleep ? params.morningSleep : null,
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
		const isToday = dayjs(s.date).isSame(dayjs(), "date");
		return respToStatus(s, !isToday);
	});
};

const respToStatus = (resp: hista.StatusResponse, locked?: boolean): Status => {
	return {
		id: resp.id,
		date: dayjs(resp.date),
		morningFitness: resp?.morningFitness ?? null,
		morningSleep: resp?.morningSleep ?? null,
		eveningFitness: resp?.eveningFitness ?? null,
		locked: locked,
	};
};
