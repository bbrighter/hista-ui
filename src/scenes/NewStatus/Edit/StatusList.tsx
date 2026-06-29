import Container from "@mui/material/Container";
import { useState } from "react";
import { actions } from "../../../actions";
import { selectIsLoadingAny } from "../../../store";
import useHista from "../../../store/store";
import { OverviewList } from "../../components";
import { AddStatus } from "./AddStatus";
import { StatusModal } from "./StatusModal";

export const StatusList = () => {
	const statuses = useHista((state) => state.statuses);
	const isLoading = useHista(selectIsLoadingAny(["statuses"]));

	const items = statuses.map((s) => ({
		id: s.id,
		date: s.date.toDate(),
		checked: Boolean(s.eveningFitness && s.morningFitness && s.morningSleep),
	}));

	const [id, setId] = useState<number | null>(null);
	const [open, setOpen] = useState(false);

	const onClick = (statusId: number) => {
		setOpen(true);
		setId(statusId);
	};

	const onClose = () => {
		setOpen(false);
		setId(null);
	};

	return (
		<Container sx={{ padding: "2rem" }}>
			<AddStatus disabled={isLoading} />
			<OverviewList
				items={items}
				getData={actions.status.list}
				onClick={onClick}
				onDelete={actions.status.delete}
			/>
			<StatusModal
				open={open}
				onClose={onClose}
				status={id !== null ? statuses.find((s) => s.id === id) : undefined}
			/>
		</Container>
	);
};
