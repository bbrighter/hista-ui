import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { useStatusExistsOnDay } from "../../store";
import StartPageCard, { type CardType } from "./components/StartPageCard";

export default function Start() {
	const types: Array<CardType> = [
		"newStatus",
		"meals",
		"medicines",
		"conditionEvents",
		"headaches",
		"notes",
		"pollens",
		"statistics",
		"status",
	];

	usePiidEffect(() => {
		actions.status.list();
	}, []);

	const statusForTodayExists = useStatusExistsOnDay(dayjs());
	const highlight = (t: CardType) =>
		(t === "status" || t === "newStatus") && !statusForTodayExists;

	return (
		<Grid
			container
			spacing={2}
			sx={{
				padding: "2rem",
				justifyContent: "center",
			}}
		>
			{types.map((t) => (
				<StartPageCard key={t} type={t} highlight={highlight(t)} />
			))}
		</Grid>
	);
}
