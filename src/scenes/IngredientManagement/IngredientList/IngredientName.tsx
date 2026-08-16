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
		{ label: "F", value: nutrition?.fat },
		{ label: "K", value: nutrition?.carbohydrate },
		{ label: "B", value: nutrition?.fiber },
		{ label: "E", value: nutrition?.protein },
	];

	const save = async (v: string) => {
		await onSave(v);
		onCancel();
	};

	return (
		<>
			{isEditing && (
				<TextFieldSaveAndAbort
					label="Zutat"
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
