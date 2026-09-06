import Container from "@mui/material/Container";
import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import { AddMedicineButton } from "./AddMedicineButton/AddMedicineButton";
import { MedicineList } from "./MedicineList/MedicineList";

export const MedicineManagement = () => {
	const isLoading = useHista(selectIsLoadingAny(["medicines"]));
	usePiidEffect(() => {
		actions.medicines.list();
	}, []);

	const medicines = useHista((state) => state.medicines);
	const medicineNames = medicines.map((m) => m.name);

	const isNameUnique = (v: string) => {
		return !medicineNames.includes(v.trim());
	};

	return (
		<Loading show={isLoading}>
			<Container sx={{ padding: "2rem" }}>
				<AddMedicineButton
					isNameUnique={isNameUnique}
					onSave={actions.medicines.create}
				/>
				<MedicineList
					medicines={medicines}
					onReorder={actions.medicines.reorder}
					onRename={actions.medicines.rename}
					isNameUnique={isNameUnique}
				/>
			</Container>
		</Loading>
	);
};
