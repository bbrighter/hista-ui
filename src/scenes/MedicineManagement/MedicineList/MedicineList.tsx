import List from "@mui/material/List";
import { useState } from "react";
import type { Medicine } from "@/store";
import { NoData } from "../../components";
import { MedicineListItem } from "./MedicineListItem";

export type MedicineListProps = {
	medicines: Array<Medicine>;
	onReorder: (id: number, prevId?: number, nextId?: number) => Promise<void>;
	onRename: (id: number, name: string) => Promise<void>;
	isNameUnique: (name: string) => boolean;
};

export const MedicineList = ({
	medicines,
	onReorder,
	onRename,
	isNameUnique,
}: MedicineListProps) => {
	const [dropIndicator, setDropIndicator] = useState<{
		overId?: number;
		nextId?: number;
		prevId?: number;
		edge: "bottom" | "top";
	}>({ edge: "top" });
	const [draggedId, setDraggedId] = useState<null | number>(null);

	const onDragOverItem = (overId: number, edge: "bottom" | "top") => {
		const medIndex = medicines.findIndex((m) => m.id === overId);
		const prevId =
			edge === "bottom" ? medicines[medIndex].id : medicines[medIndex - 1]?.id;
		const nextId =
			edge === "bottom" ? medicines[medIndex + 1]?.id : medicines[medIndex].id;

		setDropIndicator({
			overId: overId,
			nextId: nextId,
			prevId: prevId,
			edge: edge,
		});
	};

	const onDrop = async () => {
		if (draggedId == null) return;

		await onReorder(draggedId, dropIndicator?.prevId, dropIndicator?.nextId);
		setDraggedId(null);
		setDropIndicator({ edge: "top" });
	};

	const onDragStart = (id: number) => {
		setDraggedId(id);
	};

	return (
		<>
			<NoData show={medicines.length === 0} src="/pills.svg" />
			<List>
				{medicines.map((m) => (
					<MedicineListItem
						key={m.id}
						medicine={m}
						dropIndicator={dropIndicator}
						onDragOverItem={onDragOverItem}
						onDragItemLeave={() => setDropIndicator({ edge: "top" })}
						onDragStart={onDragStart}
						onDrop={onDrop}
						onReorder={onRename}
						isNameUnique={isNameUnique}
					/>
				))}
			</List>
		</>
	);
};
