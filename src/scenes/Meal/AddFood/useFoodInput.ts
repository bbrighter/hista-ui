import { actions } from "@/actions";
import { useNonArchivedIngredients } from "@/store";
import useHista from "@/store/store";

type OptionType = "food" | "template";

type InputOption = {
	id: number;
	name: string;
	type: OptionType;
};

export const useFoodInput = () => {
	const ingredients = useNonArchivedIngredients();
	const templates = useHista((state) => state.templates);
	const mealId = useHista((state) => state.meal.id);

	const options: Array<InputOption> = [
		...ingredients.map((ing) => ({
			name: ing.name,
			id: ing.id,
			type: "food" as OptionType,
		})),
		...Object.entries(templates).map(([id, t]) => ({
			name: t.name,
			id: Number(id),
			type: "template" as OptionType,
		})),
	];

	const listIngredients = actions.ingredients.list;
	const listTemplates = actions.templates.list;
	const postFoodByName = actions.meals.postFoodByName;
	const postFoodById = actions.meals.postFoodById;
	const postFoodsByTemplate = actions.meals.postFoodsByTemplate;

	return {
		mealId,
		options,
		listIngredients,
		listTemplates,
		postFoodById,
		postFoodByName,
		postFoodsByTemplate,
	};
};
