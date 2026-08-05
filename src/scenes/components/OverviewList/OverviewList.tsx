import "react-swipeable-list/dist/styles.css";

import Button from "@mui/material/Button";
import { useMemo, useState } from "react";
import { SwipeableList } from "react-swipeable-list";
import { usePiidEffect } from "../../../hooks/usePiidEffect";
import { OverviewListItem } from "./OverviewListItem";

interface ListItemInterface {
	id: number;
	date: Date | string;
	secondary?: string;
	severity?: number;
	checked?: boolean;
}

export function OverviewList(props: {
	items: Array<ListItemInterface>;
	showSeverity?: boolean;
	onClick: (id: number) => void;
	onDelete: (id: number) => Promise<void>;
	// biome-ignore lint/suspicious/noConfusingVoidType: That's true. Some functions return nothing
	getData: () => Promise<void | Array<unknown>>;
	severityColorMapping?: (severity: number) => string;
	onSetNow?: (id: number) => Promise<void>;
}) {
	const {
		items,
		showSeverity,
		onClick,
		onDelete,
		getData,
		severityColorMapping,
		onSetNow,
	} = props;

	const [limit, setLimit] = useState(20);
	const visibleItems = useMemo(() => items.slice(0, limit), [limit, items]);

	usePiidEffect(() => {
		getData();
	}, []);

	const onShowAll = () => {
		setLimit(items.length - 1);
	};

	return (
		<>
			<SwipeableList>
				{visibleItems.map((i) => (
					<OverviewListItem
						key={i.id}
						date={i.date}
						onClick={() => onClick(i.id)}
						onDelete={() => onDelete(i.id)}
						showSeverity={showSeverity}
						severity={i.severity}
						secondary={i.secondary}
						severityColorMapping={severityColorMapping}
						checked={i.checked}
						{...(onSetNow && { onSetNow: () => onSetNow(i.id) })}
					/>
				))}
			</SwipeableList>
			<Button sx={{ mt: "1rem" }} onClick={onShowAll}>
				Alle anzeigen
			</Button>
		</>
	);
}
