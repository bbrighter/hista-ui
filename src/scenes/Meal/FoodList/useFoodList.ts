import { actions } from "@/actions";
import useHista from "@/store/store";

export type FoodListProps = ReturnType<typeof useFoodList>;

export const useFoodList = () => {
	const foods = useHista((state) => state.meal.foods);
	const ingredients = useHista((state) => state.ingredients);
	const returnFoods = foods.map((f) => {
		const name =
			ingredients.find((i) => i.id === f.ingredientId)?.name ?? "Unbenannt";
		const food = { ...f, ingredientName: name, foodId: f.id };
		const { id, ...foodWithoutId } = food;
		return foodWithoutId;
	});

	return {
		foods: returnFoods,
		patchAmount: actions.meals.patchFoodAmount,
		patchCondition: actions.meals.patchFoodCondition,
		deleteFood: actions.meals.deleteFood,
	};
};
