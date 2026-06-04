import useHista from "../store";
import type { Nutrition } from "../types";

export const useTotalMealNutrition = (): Nutrition => {
	const foods = useFoodAmountsAndNutritionsForMeal();
	return foods.reduce<Nutrition>(
		(acc, curr) => {
			acc.carbohydrate +=
				((curr?.carbohydrate || 0) * (curr?.amount || 0)) / 100;
			acc.fat += ((curr?.fat || 0) * (curr?.amount || 0)) / 100;
			acc.fiber += ((curr?.fiber || 0) * (curr?.amount || 0)) / 100;
			acc.protein += ((curr?.protein || 0) * (curr?.amount || 0)) / 100;
			return acc;
		},
		{ fat: 0, fiber: 0, carbohydrate: 0, protein: 0 } satisfies Nutrition,
	);
};

const useFoodAmountsAndNutritionsForMeal = () => {
	const ingredients = useHista((state) => state.ingredients);
	const foods = useHista((state) => state.meal.foods);

	return foods.map((f) => ({
		amount: f.amount,
		...ingredients.find((i) => i.id === f.ingredientId)?.nutrition,
	}));
};

export const useFoodForMeal = () => {
	const foods = useHista((state) => state.meal.foods);
	const ingredients = useHista((state) => state.ingredients);
	return foods.map((f) => {
		const name =
			ingredients.find((i) => i.id === f.ingredientId)?.name ?? "Unbenannt";
		return { ...f, ingredientName: name };
	});
};
