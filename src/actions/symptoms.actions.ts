import { client } from "../api/api";
import { respToCondition, respToSymptoms } from "../store";
import useHista from "../store/store";

export const symptoms = {
	list: async () => {
		const { setSymptoms, loaded, setLoaded } = useHista.getState();

		if (loaded.symptoms) return;
		const resp = await client.ListSymptoms();

		setSymptoms(respToSymptoms(resp));
		setLoaded("symptoms");
	},

	patchName: async (id: number, name: string) => {
		const { updateSymptom } = useHista.getState();

		const trimmedName = name.trim();
		await client.PatchSymptomName(id, { name: trimmedName });
		updateSymptom(id, { name: trimmedName });
	},

	postCategory: async (name: string) => {
		const { setSymptoms, symptoms } = useHista.getState();

		const trimmedName = name.trim();
		const resp = await client.PostSymptomCategory({ name: trimmedName });
		setSymptoms([
			...symptoms,
			{ categoryId: resp.id, categoryName: trimmedName, symptoms: [] },
		]);

		return resp.id;
	},

	deleteCategory: async (id: number) => {
		const { removeCategory } = useHista.getState();

		await client.DeleteSymptomCategory(id);
		removeCategory(id);
	},

	patchCategoryName: async (id: number, name: string) => {
		const { updateCategory } = useHista.getState();

		const trimmedName = name.trim();
		await client.PatchCategoryName(id, { name: trimmedName });
		updateCategory(id, { categoryName: trimmedName });
	},

	patchSymptomCategory: async (
		symptomId: number,
		fromCat: number,
		toCat: number,
	) => {
		const { setSymptoms, symptoms } = useHista.getState();

		await client.PatchSymptomCategory(symptomId, { toCategoryId: toCat });

		const fromCatIdx = symptoms.findIndex((c) => c.categoryId === fromCat);
		const toCatIdx = symptoms.findIndex((c) => c.categoryId === toCat);
		const relevantSymptom = symptoms[fromCatIdx].symptoms.find(
			(s) => s.id === symptomId,
		);

		if (fromCatIdx < 0 || toCatIdx < 0 || !relevantSymptom) {
			return;
		}
		setSymptoms(
			symptoms.map((c) => {
				if (c.categoryId === fromCat) {
					return {
						...c,
						symptoms: c.symptoms.filter((s) => s.id !== symptomId),
					};
				}
				if (c.categoryId === toCat) {
					return {
						...c,
						symptoms: [
							...c.symptoms,
							{ ...relevantSymptom, categoryId: toCat },
						],
					};
				}
				return c;
			}),
		);
	},
};

export const conditions = {
	delete: async (id: number) => {
		const { setSymptoms, removeCondition } = useHista.getState();

		const resp = await client.DeleteCondition(id);
		setSymptoms(respToSymptoms(resp));
		removeCondition(id);
	},

	postByName: async (name: string, catId: number) => {
		const { setSymptoms, addCondition, conditionEvent } = useHista.getState();

		const resp = await client.PostCondition(conditionEvent.id, {
			symptomName: name,
			categoryId: catId,
		});
		addCondition(respToCondition(resp.condition));
		if (resp.symptoms) {
			setSymptoms(respToSymptoms(resp.symptoms));
		}
	},

	postById: async (id: number) => {
		const { addCondition, conditionEvent } = useHista.getState();

		const resp = await client.PostCondition(conditionEvent.id, {
			symptomId: id,
		});
		addCondition({
			id: resp.condition.id,
			symptomId: id,
			severity: resp.condition.severity,
		});
	},

	patchSeverity: async (id: number, severity: number) => {
		const { updateCondition } = useHista.getState();

		await client.PatchCondition(id, { severity: severity });
		updateCondition(id, { severity: severity });
	},
};
