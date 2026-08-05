import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { useState } from "react";
import { actions } from "../../../actions";
import { type Status, useStatusExistsOnDays } from "../../../store";
import { OverviewList } from "../../components";
import { AddStatus } from "./AddStatus";
import { StatusModal } from "./StatusModal";

type StatusListProps = {
	statuses: Array<Status>;
	isLoading: boolean;
};

export const StatusList = ({ statuses, isLoading }: StatusListProps) => {
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

	const today = dayjs();
	const yesterday = today.subtract(1, "day");
	const dayBefore = today.subtract(2, "day");
	const onAddStatus = async (date: dayjs.Dayjs) => {
		const id = await actions.status.post(date);
		setId(id);
		setOpen(true);
	};

	const [existsToday, existsYesterday, existsDayBefore] = useStatusExistsOnDays(
		[today, yesterday, dayBefore],
	);

	return (
		<Container sx={{ padding: "2rem" }}>
			<AddStatus
				disabled={isLoading}
				onAddStatus={onAddStatus}
				statusExistsDayBefore={existsDayBefore}
				statusExistsToday={existsToday}
				statusExistsYesterday={existsYesterday}
			/>
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
