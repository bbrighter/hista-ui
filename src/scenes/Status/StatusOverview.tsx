import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { useAppNavigate } from "@/hooks/useNavigate";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { StatusEvaluation } from "./Evaluation/StatusEvaluation";
import { StatusList } from "./List/StatusList";

export const StatusOverview = () => {
	const statuses = useHista((state) => state.statuses);
	const isLoading = useHista(selectIsLoadingAny(["statuses"]));
	const [tab, setTab] = useState(0);

	const navigate = useAppNavigate();

	const onNavigate = (statusId: number) => {
		navigate.to.statusSingle(statusId);
	};

	return (
		<Container>
			<Tabs value={tab} onChange={(_e, v) => setTab(v)}>
				<Tab label="Status" value={0} />
				<Tab label="Auswertung" value={1} />
			</Tabs>
			{tab === 0 && (
				<StatusList
					statuses={statuses}
					isLoading={isLoading}
					onNavigate={onNavigate}
				/>
			)}
			{tab === 1 && <StatusEvaluation statuses={statuses} />}
		</Container>
	);
};
