import type { hista } from "../../api/generatedApi";

export interface Food {
	id: number;
	ingredientId: number;
	condition: FoodCondition;
	amount?: number;
}

export type FoodCondition = "raw" | "cooked";

export const respToFoodCondition = (resp: string): FoodCondition => {
	return resp === "raw" ? "raw" : "cooked";
};

export const respToFood = (resp: hista.FoodResponse): Food => {
	return {
		id: resp.id,
		ingredientId: resp.ingredientId,
		condition: respToFoodCondition(resp.foodCondition),
		amount: resp.amount,
	};
};
