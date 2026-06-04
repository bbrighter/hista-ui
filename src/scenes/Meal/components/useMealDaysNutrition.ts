import useHista from "../../../store/store";

export const useMealDaysNutrition = () => {
	const nutritions = useHista((state) => state.nutritionStatistics.statistics);
	const mealDate = useHista((state) => state.meal.date);
	return (
		nutritions.find((n) => n.date.toDateString() === mealDate.toDateString())
			?.nutrition ?? { carbohydrate: 0, fat: 0, fiber: 0, protein: 0 }
	);
};
