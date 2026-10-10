import { t } from "@lingui/core/macro";
import ListItemText from "@mui/material/ListItemText";
import TextFieldSaveAndAbort from "@/scenes/components/TextFieldSaveAndAbort";
import type { Nutrition } from "@/store";

type IngredientNameProps = {
	name: string;
	nutrition?: Nutrition;
	isArchived: boolean;
	isEditing?: boolean;
	isSaveable: (v: string) => boolean;
	onSave: (v: string) => Promise<void>;
	setEditing: (editing: boolean) => void;
};

export const IngredientName = ({
	name,
	nutrition,
	isArchived,
	isEditing,
	isSaveable,
	onSave,
	setEditing,
}: IngredientNameProps) => {
	const onCancel = () => setEditing(false);

	const nutritionPairs = [
		{ label: t`F`, value: nutrition?.fat },
		{ label: t`K`, value: nutrition?.carbohydrate },
		{ label: t`B`, value: nutrition?.fiber },
		{ label: t`E`, value: nutrition?.protein },
	];

	const save = async (v: string) => {
		await onSave(v);
		onCancel();
	};

	return (
		<>
			{isEditing && (
				<TextFieldSaveAndAbort
					label={t`Zutat`}
					onCancel={onCancel}
					isSaveable={isSaveable}
					size="small"
					value={name}
					onSave={save}
				/>
			)}
			{!isEditing && (
				<ListItemText
					primary={name}
					secondary={
						nutrition
							? nutritionPairs
									.map((n) => `${n.label}: ${n.value?.toLocaleString("de-DE")}`)
									.join(" | ")
							: undefined
					}
					slotProps={{
						primary: { color: isArchived ? "textDisabled" : "textPrimary" },
					}}
				/>
			)}
		</>
	);
};
