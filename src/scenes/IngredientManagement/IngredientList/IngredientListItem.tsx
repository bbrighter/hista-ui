import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import { actions } from "@/actions";
import type { Nutrition } from "../../../store";
import { Icons } from "../../components/Icons";
import { ArchiveButton } from "./ArchiveButton";
import { EditNutritionButton } from "./EditNutritionButton";
import { IngredientName } from "./IngredientName";
import { useIsSaveable } from "./useIsSaveable";

export const IngredientListItem = ({
	name,
	id,
	isArchived,
	nutrition,
}: {
	name: string;
	id: number;
	isArchived: boolean;
	nutrition?: Nutrition;
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const onSave = async (v: string) => {
		await actions.ingredients.changeName(id, v);
	};

	const onEdit = () => setIsEditing(!isEditing);
	const onArchive = actions.ingredients.archive;

	const isSaveable = useIsSaveable();

	return (
		<ListItem
			secondaryAction={
				<ButtonGroup>
					<IconButton
						onClick={onEdit}
						data-testid="editButton"
						disabled={isArchived}
						title="Umbenennen"
					>
						<Icons.actions.edit />
					</IconButton>
					<EditNutritionButton
						ingredientId={id}
						nutrition={nutrition}
						disabled={isArchived}
						updateNutrition={actions.ingredients.updateNutrition}
					/>
					<ArchiveButton id={id} isArchived={isArchived} onClick={onArchive} />
				</ButtonGroup>
			}
		>
			<IngredientName
				isArchived={isArchived}
				name={name}
				isSaveable={isSaveable}
				onSave={onSave}
				nutrition={nutrition}
				setEditing={setIsEditing}
				isEditing={isEditing}
			/>
		</ListItem>
	);
};
