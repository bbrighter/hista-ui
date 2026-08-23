import Button from "@mui/material/Button";
import { useState } from "react";

import TextFieldSaveAndAbort from "../../components/TextFieldSaveAndAbort";

type AddMedicineButtonProps = {
	onSave: (name: string) => Promise<void>;
	isNameUnique: (name: string) => boolean;
};

export const AddMedicineButton = ({
	onSave,
	isNameUnique,
}: AddMedicineButtonProps) => {
	const [isAdding, setIsAdding] = useState(false);
	// const medicineNames = useHista((state) => state.medicines).map((m) => m.name);

	const onAddClick = () => setIsAdding(true);
	const onCancel = () => setIsAdding(false);

	const isSaveable = (v: string) => v.trim() !== "" && isNameUnique(v);

	// const isSaveable = (v: string) => {
	// 	if (v.trim() === "") {
	// 		return false;
	// 	}
	// 	if (medicineNames.includes(v.trim())) {
	// 		return false;
	// 	}
	// 	return true;
	// };

	const save = async (v: string) => {
		onSave(v);
		// await actions.medicines.create(v);
		onCancel();
	};

	return !isAdding ? (
		<Button variant="contained" onClick={onAddClick}>
			Medikament hinzufügen
		</Button>
	) : (
		<TextFieldSaveAndAbort
			label="Medikament"
			value=""
			isSaveable={isSaveable}
			onSave={save}
			onCancel={onCancel}
			size="medium"
		/>
	);
};
