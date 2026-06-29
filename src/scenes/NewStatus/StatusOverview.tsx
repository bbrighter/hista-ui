import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import useHista from "../../store/store";
import { StatusList } from "./Edit";
import { StatusEvaluation } from "./Evaluation";

export const StatusOverview = () => {
	const statuses = useHista((state) => state.statuses);
	const [tab, setTab] = useState(0);

	return (
		<Container>
			<Tabs value={tab} onChange={(_e, v) => setTab(v)}>
				<Tab label="Status" value={0} />
				<Tab label="Auswertung" value={1} />
			</Tabs>
			{tab === 0 && <StatusList />}
			{tab === 1 && <StatusEvaluation statuses={statuses} />}
		</Container>
	);
};
