import List from "@mui/material/List";
import { useMemo } from "react";
import { useAllIngredients, useNonArchivedIngredients } from "@/store";
import { IngredientListItem } from "./IngredientListItem";

type IngredientListProps = ReturnType<typeof useIngredientList>;

export const IngredientList = ({ showIngredients }: IngredientListProps) => {
	return (
		<List>
			{showIngredients.map((i) => (
				<IngredientListItem key={i.id} {...i} />
			))}
		</List>
	);
};

export const useIngredientList = (showArchived: boolean) => {
	const ingredients = useAllIngredients();
	const nonArchivedIngredients = useNonArchivedIngredients();

	const showIngredients = useMemo(
		() => (showArchived ? nonArchivedIngredients : ingredients),
		[ingredients, nonArchivedIngredients, showArchived],
	);

	return { showIngredients };
};
