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

	const totalNumberOfItems = items.length;
	const minNumberOfItems = 20;
	const [limit, setLimit] = useState(minNumberOfItems);

	const visibleItems = useMemo(
		() =>
			[...items]
				.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
				.slice(0, limit),
		[limit, items],
	);

	usePiidEffect(() => {
		getData();
	}, []);

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
			{limit === minNumberOfItems ? (
				<Button
					sx={{ mt: "1rem" }}
					onClick={() => setLimit(totalNumberOfItems)}
				>
					Alle anzeigen
				</Button>
			) : (
				<Button sx={{ mt: "1rem" }} onClick={() => setLimit(minNumberOfItems)}>
					Weniger anzeigen
				</Button>
			)}
		</>
	);
}
