import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import { FoodConditionToggle } from "../../../components";
import { Icons } from "../../../components/Icons";
import { IngredientSelect } from "./IngredientSelect";
import type { DraftStateType } from "./useTemplateDraft";

type DraftRowProps = {
	index: number;
} & DraftStateType;

export const DraftRow = ({
	index,
	draft,
	onChangeIngredient,
	onChangeCondition,
	onDelete,
}: DraftRowProps) => {
	const { ingredient, condition } = draft[index];

	return (
		<Stack direction="row" sx={{ justifyContent: "space-between" }}>
			<IngredientSelect
				ingredient={ingredient}
				onChange={(ing) => onChangeIngredient(index, ing)}
			/>
			<FoodConditionToggle
				condition={condition}
				onClick={() => onChangeCondition(index)}
			/>
			<IconButton
				data-testid="delete-row-button"
				onClick={() => onDelete(index)}
			>
				<Icons.actions.delete />
			</IconButton>
		</Stack>
	);
};
