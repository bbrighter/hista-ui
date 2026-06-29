import Container from "@mui/material/Container";
import { useState } from "react";
import type { Status } from "../../../store";
import type { ActiveEntries, StatusMetricKey } from "./config";
import { Legend } from "./Legend";
import { StatusChart } from "./StatusChart";

export const StatusEvaluation = ({ statuses }: { statuses: Array<Status> }) => {
	const [activeEntries, setActiveEntries] = useState<ActiveEntries>({
		eveningFitness: true,
		morningFitness: true,
		morningSleep: true,
	});

	const onClick = (c: StatusMetricKey) => {
		const newActive = { ...activeEntries, [c]: !activeEntries[c] };
		setActiveEntries(newActive);
	};

	return (
		<Container sx={{ padding: "2rem" }}>
			<Legend active={activeEntries} onClick={onClick} />
			<StatusChart statuses={statuses} active={activeEntries} />
		</Container>
	);
};
