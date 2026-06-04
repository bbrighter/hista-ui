import Container from "@mui/material/Container";

import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import { IntakeList, ManagementButton } from "./components";

export const Medicines = () => {
	const isLoading = useHista(selectIsLoadingAny(["medicines", "intakes"]));
	usePiidEffect(() => {
		actions.medicines.list();
		actions.intakes.list();
	}, []);

	return (
		<Loading show={isLoading}>
			<Container sx={{ mt: "2rem" }}>
				<ManagementButton />
				<IntakeList />
			</Container>
		</Loading>
	);
};
