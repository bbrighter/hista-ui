import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useAppNavigate } from "@/hooks/useNavigate";
import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import { IntakeList } from "./IntakeList/IntakeList";
import { useIntakeList } from "./IntakeList/intakeHooks";

export const Medicines = () => {
	const isLoading = useHista(selectIsLoadingAny(["medicines", "intakes"]));
	usePiidEffect(() => {
		actions.medicines.list();
		actions.intakes.list();
	}, []);

	const intakeListProps = useIntakeList();
	const navigate = useAppNavigate();

	return (
		<Loading show={isLoading}>
			<Container sx={{ padding: "2rem" }}>
				<Button variant="outlined" onClick={navigate.to.manageMedicine}>
					Medikamente verwalten
				</Button>
				<IntakeList {...intakeListProps} />
			</Container>
		</Loading>
	);
};
