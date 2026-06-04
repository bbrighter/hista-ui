import IconButton from "@mui/material/IconButton";

import { Icons } from "./Icons";

export const ArchiveButton = ({
	id,
	isArchived,
	onArchive,
}: {
	id: number;
	isArchived: boolean;
	onArchive: (id: number) => Promise<void>;
}) => {
	const onClick = () => {
		onArchive(id);
	};

	return (
		<IconButton onClick={onClick} data-testid="archiveButton">
			{isArchived ? (
				<Icons.actions.archive color="disabled" />
			) : (
				<Icons.actions.unarchive />
			)}
		</IconButton>
	);
};
