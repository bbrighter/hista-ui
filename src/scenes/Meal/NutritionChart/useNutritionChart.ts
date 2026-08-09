import dayjs from "dayjs";
import { useMemo } from "react";
import { actions } from "@/actions";
import useHista from "../../../store/store";

export type NutritionChartProps = ReturnType<typeof useNutritionChart>;

export const useNutritionChart = () => {
	const nutrition = useHista((state) => state.nutritionStatistics.statistics);
	const mealDate = useHista((state) => state.meal.date);
	return useMemo(
		() => ({
			nutrition: nutrition.find(
				(n) => n.date.toDateString() === mealDate.toDateString(),
			)?.nutrition ?? { carbohydrate: 0, fat: 0, fiber: 0, protein: 0 },
			date: dayjs(mealDate),
			getStatistics: actions.statistics.getNutritionStatistics,
		}),
		[mealDate, nutrition],
	);
};
