import type { hista } from "../../api/generatedApi";

export interface MetaMeal {
	id: number;
	date: Date;
}

export type Meals = Array<MetaMeal>;

export const respToMetaMeals = (resp: hista.MealListResponse): Meals => {
	if (!resp.meals) return [];
	const meals = resp.meals.map((m) => ({ id: m.id, date: new Date(m.date) }));
	return meals.sort((a, b) => b.date.getTime() - a.date.getTime());
};
