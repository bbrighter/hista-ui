import DoneAllIcon from "@mui/icons-material/DoneAll";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { SwipeableListItem } from "react-swipeable-list";
import { formatDate } from "../../../utils/formatDate";
import { Icons } from "../Icons";
import { swipeDeleteItem, swipeSetNow } from "./ListActions";

export function OverviewListItem(props: {
	date: Date | string;
	secondary?: string;
	severity?: number;
	showSeverity?: boolean;
	onClick: () => void;
	onDelete: () => Promise<void>;
	onSetNow?: () => Promise<void>;
	severityColorMapping?: (severity: number) => string;
	checked?: boolean;
}) {
	const {
		date,
		secondary,
		severity,
		showSeverity,
		onClick,
		onDelete,
		onSetNow,
		severityColorMapping,
	} = props;
	const [swiped, setSwiped] = useState(false);

	return (
		<SwipeableListItem
			threshold={0.5}
			trailingActions={swipeDeleteItem(onDelete)}
			onSwipeStart={() => setSwiped(true)}
			{...(onSetNow && { leadingActions: swipeSetNow(onSetNow) })}
		>
			<ListItem
				sx={{
					":hover": {
						cursor: "pointer",
						backgroundColor: "rgba(255,255,255,0.1)",
					},
				}}
				onClick={() => {
					if (swiped) {
						setSwiped(false);
						return;
					}
					onClick();
				}}
			>
				<ListItemText
					primary={
						typeof date === "string" ? date : formatDate(date, "withTime")
					}
					secondary={secondary}
				/>
				{showSeverity && severity !== undefined && (
					<ListItemIcon title="Schwere">
						<Icons.circle
							sx={
								severityColorMapping
									? { color: severityColorMapping(severity) }
									: {}
							}
							data-testid="circle-icon"
						/>{" "}
					</ListItemIcon>
				)}
				{props.checked && (
					<ListItemIcon>
						<DoneAllIcon color="success" />
					</ListItemIcon>
				)}
			</ListItem>
		</SwipeableListItem>
	);
}
