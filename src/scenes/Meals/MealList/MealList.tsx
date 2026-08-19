import { actions } from "@/actions";
import { useAppNavigate } from "@/hooks/useNavigate";
import { OverviewList } from "@/scenes/components";
import type { Meals } from "@/store";
import useHista from "@/store/store";

type MealListProps = {
	meals: Meals;
	onClick: (id: number) => void;
	onDelete: (id: number) => Promise<void>;
	onSetNow: (id: number) => Promise<void>;
	getMeals: () => Promise<void>;
};

export function MealList({
	meals,
	onClick,
	onDelete,
	onSetNow,
	getMeals,
}: MealListProps) {
	return (
		<OverviewList
			items={meals}
			onClick={onClick}
			onDelete={onDelete}
			getData={getMeals}
			onSetNow={onSetNow}
		/>
	);
}

export const useMealList = () => {
	const meals = useHista((state) => state.meals);
	const navigate = useAppNavigate();

	const onClick = (id: number) => {
		navigate.to.mealDetail(id);
	};

	const onDelete = async (id: number) => {
		await actions.meals.delete(id);
	};

	const onSetNow = async (id: number) => {
		await actions.meals.patchDate(id, new Date().toISOString());
	};

	const getMeals = actions.meals.list;

	return { meals, onClick, onDelete, onSetNow, getMeals };
};
