import type { hista } from "../../api/generatedApi";

export interface Symptom {
	id: number;
	name: string;
	categoryId: number;
}

export interface SymptomCategory {
	categoryId: number;
	categoryName: string;
	symptoms: Array<Symptom>;
}

export type SymptomCategories = Array<SymptomCategory>;

export function respToSymptoms(
	resp: hista.SymptomCategoryListResponse,
): SymptomCategories {
	return resp.Categories.map((c) => ({
		categoryId: c.id,
		categoryName: c.name,
		symptoms: c.symptoms.map((s) => ({
			id: s.id,
			name: s.name,
			categoryId: s.categoryId,
		})),
	}));
}
