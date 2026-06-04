import type { Dayjs } from "dayjs";

import { client } from "../api/api";
import type { hista } from "../api/generatedApi";
import type {
	Headache,
	HeadachePositions,
	HeadacheSymptoms,
	HeadacheTypes,
} from "../store";
import useHista from "../store/store";

const validHeadachePositions: Record<string, string> = {
	left: "Links",
	right: "Rechts",
	top: "Oben",
	"front top": "Vorne",
	back: "Hinterkopf",
	side: "Seite",
	temple: "Schläfe",
	front: "Stirn",
	ear: "Ohr",
	neck: "Nacken",
	eye: "Auge",
};

const validHeadacheTypes: Record<string, string> = {
	"pulsating-pounding": "Pulsierend-pochend",
	"dull-pressing": "Dumpf-drückend",
	stabbing: "Stechend",
};

const validHeadacheSymptoms: Record<string, string> = {
	"short-term memory": "Kurzzeitgedächtnis",
	tinnitus: "Tinnitus",
	"light-sensitive": "Lichtempfindlichkeit",
	"noise-sensitive": "Lärmempfindlichkeit",
	"odor-sensitive": "Geruchsempfindlichkeit",
	dizziness: "Schwindel",
	"lack of concentration": "Konzentrationsstörung",
	tired: "Müdigkeit",
	exhausted: "Erschöpfung",
	nausea: "Übelkeit",
	"no physical activity": "Keine körperliche Aktivität",
	"physical activity": "Verstärkt durch körperliche Aktivität",
	"mind activity": "Verstärkt durch geistige Aktivität",
};

const respToHeadache = (resp: hista.HeadacheResponse): Headache => {
	return {
		date: new Date(resp.date),
		description: resp.description,
		id: resp.id,
		positions:
			resp.positions?.map((p) => ({
				value: p,
				label: validHeadachePositions[p],
			})) ?? [],
		severity: resp.severity,
		symptoms:
			resp.symptoms?.map((s) => ({
				value: s,
				label: validHeadacheSymptoms[s],
			})) ?? [],
		types:
			resp.types?.map((t) => ({ value: t, label: validHeadacheTypes[t] })) ??
			[],
	};
};

const respToHeadaches = (
	resp: hista.HeadacheListResponse,
): Record<number, Headache> => {
	return Object.fromEntries(
		resp.headaches.map((h) => [h.id, respToHeadache(h)]),
	);
};

export const headaches = {
	list: async () => {
		const resp = await client.ListHeadaches();
		const headaches = respToHeadaches(resp);

		const { setHeadaches, setLoaded } = useHista.getState();
		setHeadaches(headaches);
		setLoaded("headaches");
	},

	get: async (id: number) => {
		const resp = await client.GetHeadache(id);
		const headache = respToHeadache(resp);

		const { setHeadache, setLoaded } = useHista.getState();
		setHeadache(headache);
		setLoaded("headache");
	},

	post: async (): Promise<number> => {
		const date = new Date();
		const severity = 5;
		const resp = await client.PostHeadache({
			date: date.toISOString(),
			severity: severity,
		});

		const { setHeadache, addHeadache, setLoaded } = useHista.getState();
		const headache: Headache = {
			id: resp.id,
			date: date,
			severity: severity,
			positions: [],
			symptoms: [],
			types: [],
			description: "",
		};
		setHeadache(headache);
		addHeadache(resp.id, headache);
		setLoaded("headache");

		return resp.id;
	},

	delete: async (id: number) => {
		await client.DeleteHeadache(id);

		const { removeHeadache } = useHista.getState();
		removeHeadache(id);
	},

	patchSeverity: async (id: number, severity: number) => {
		await client.PatchHeadache(id, { severity: severity });

		const { updateHeadache } = useHista.getState();
		updateHeadache(id, { severity: severity });
	},

	patchDate: async (id: number, date: Dayjs) => {
		await client.PatchHeadache(id, { date: date.toISOString() });

		const { updateHeadache } = useHista.getState();
		updateHeadache(id, { date: date.toDate() });
	},

	patchDescription: async (id: number, description: string) => {
		await client.PatchHeadache(id, { description: description });

		const { updateHeadache } = useHista.getState();
		updateHeadache(id, { description: description });
	},

	patchPositions: async (id: number, pos: HeadachePositions) => {
		const { headache } = useHista.getState();
		if (equalPositions(headache.positions, pos)) return;
		await client.PatchHeadache(id, { positions: pos.map((p) => p.value) });

		const { updateHeadache } = useHista.getState();
		updateHeadache(id, { positions: pos });
	},

	patchSymptoms: async (id: number, symptoms: HeadacheSymptoms) => {
		const { headache } = useHista.getState();
		if (equalPositions(headache.symptoms, symptoms)) return;
		await client.PatchHeadache(id, { symptoms: symptoms.map((p) => p.value) });

		const { updateHeadache } = useHista.getState();
		updateHeadache(id, { symptoms: symptoms });
	},

	patchTypes: async (id: number, types: HeadacheTypes) => {
		const { headache } = useHista.getState();
		if (equalPositions(headache.types, types)) return;
		await client.PatchHeadache(id, { types: types.map((p) => p.value) });

		const { updateHeadache } = useHista.getState();
		updateHeadache(id, { types: types });
	},
};

const equalPositions = (
	a: Array<{ value: string }>,
	b: Array<{ value: string }>,
) => a.length === b.length && a.every((p, i) => p.value === b[i].value);
