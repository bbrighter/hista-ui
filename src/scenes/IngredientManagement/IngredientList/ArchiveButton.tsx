import IconButton from "@mui/material/IconButton";

import { Icons } from "../../components/Icons";

export const ArchiveButton = ({
	id,
	isArchived,
	onClick,
}: {
	id: number;
	isArchived: boolean;
	onClick: (id: number) => Promise<void>;
}) => {
	return (
		<IconButton onClick={() => onClick(id)} data-testid="archiveButton">
			{isArchived ? (
				<Icons.actions.unarchive color="disabled" />
			) : (
				<Icons.actions.archive />
			)}
		</IconButton>
	);
};
