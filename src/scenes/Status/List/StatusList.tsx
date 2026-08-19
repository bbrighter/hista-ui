import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { useMemo } from "react";
import { actions } from "../../../actions";
import { type Status, useStatusExistsOnDays } from "../../../store";
import { Loading, OverviewList } from "../../components";
import { AddStatus } from "./AddStatus";

type StatusListProps = {
	statuses: Array<Status>;
	isLoading: boolean;
	onNavigate: (id: number) => void;
};

export const StatusList = ({
	statuses,
	isLoading,
	onNavigate,
}: StatusListProps) => {
	const items = useMemo(
		() =>
			statuses.map((s) => ({
				id: s.id,
				date: s.date.toDate(),
				checked: Object.values(s).every(Boolean),
			})),
		[statuses],
	);

	const today = dayjs();
	const yesterday = today.subtract(1, "day");
	const dayBefore = today.subtract(2, "day");
	const onAddStatus = async (date: dayjs.Dayjs) => {
		const id = await actions.status.post(date);
		onNavigate(id);
	};

	const [existsToday, existsYesterday, existsDayBefore] = useStatusExistsOnDays(
		[today, yesterday, dayBefore],
	);

	return (
		<Container sx={{ padding: "2rem" }}>
			<Loading show={isLoading}>
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
					onClick={onNavigate}
					onDelete={actions.status.delete}
				/>
			</Loading>
		</Container>
	);
};
