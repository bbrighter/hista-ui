import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import { actions } from "../../actions";
import { useAppNavigate } from "../../hooks/useNavigate";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import { Icons } from "../components/Icons";
import EventList from "./components/EventList";

export default function ConditionEvents() {
	const isLoading = useHista(selectIsLoadingAny(["conditionEvents"]));
	const navigate = useAppNavigate();
	const [loading, setLoading] = useState(false);

	const onClickAddSymptom = async () => {
		setLoading(true);
		const id = await actions.conditionEvents.post();
		setLoading(false);
		if (id) {
			navigate.to.conditionEventDetails(id);
		}
	};

	const onClickManageSymptoms = () => {
		navigate.to.manageSymptoms();
	};

	return (
		<Loading show={isLoading}>
			<Container sx={{ paddingTop: "2rem" }}>
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						startIcon={<Icons.symptom />}
						onClick={onClickAddSymptom}
						loading={loading}
					>
						Neues Symptom
					</Button>
					<IconButton
						data-testid="manage-symptoms-button"
						color="primary"
						onClick={onClickManageSymptoms}
					>
						<Icons.manage />
					</IconButton>
				</Stack>
				<EventList />
			</Container>
		</Loading>
	);
}
