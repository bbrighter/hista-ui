import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useAppNavigate } from "@/hooks/useNavigate";
import { actions } from "../../../actions";
import { type Status, useStatusExistsOnDays } from "../../../store";
import { OverviewList } from "../../components";
import { AddStatus } from "./AddStatus";

type StatusListProps = {
	statuses: Array<Status>;
	isLoading: boolean;
};

export const StatusList = ({ statuses, isLoading }: StatusListProps) => {
	const items = useMemo(
		() =>
			statuses.map((s) => ({
				id: s.id,
				date: s.date.toDate(),
				checked: Object.values(s).every(Boolean),
			})),
		[statuses],
	);

	const navigate = useAppNavigate();

	const onClick = (statusId: number) => {
		navigate.to.statusSingle(statusId);
	};

	const today = dayjs();
	const yesterday = today.subtract(1, "day");
	const dayBefore = today.subtract(2, "day");
	const onAddStatus = async (date: dayjs.Dayjs) => {
		const id = await actions.status.post(date);
		navigate.to.statusSingle(id);
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
		</Container>
	);
};
