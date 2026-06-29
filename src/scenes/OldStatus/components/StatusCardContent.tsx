import Card from "@mui/material/Card";

import type { Status } from "../../../store";
import { LockOverlay } from "./LockOverlay";
import { Evening, Morning } from "./Sliders";

export default function StatusCardContent(props: {
	status: Status;
	expanded: boolean;
}) {
	return (
		<Card variant="elevation" sx={{ position: "relative" }}>
			<LockOverlay id={props.status.id} locked={props.status.locked}>
				<Morning status={props.status} />
				<Evening status={props.status} />
			</LockOverlay>
		</Card>
	);
}
