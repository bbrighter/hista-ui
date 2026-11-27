import Grid from "@mui/material/Grid";
import useHista from "@/store/store";
import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import StartPageCard, { type CardType } from "./components/StartPageCard";

export default function Start() {
	const types: Array<CardType> = [
		"status",
		"headaches",
		"meals",
		"medicines",
		"conditionEvents",
		"notes",
		"pollens",
		"statistics",
	];

	usePiidEffect(() => {
		actions.appInfo.get();
	}, []);

	const entitiesFilled = useHista((state) => state.entitiesFilled);

	const highlight = (t: CardType) => {
		if (t === "status") return !entitiesFilled.statuses;
		if (t === "headaches") return !entitiesFilled.headaches;
		return false;
	};

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
