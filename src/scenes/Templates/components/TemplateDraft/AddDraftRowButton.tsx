import Button from "@mui/material/Button";

import type { DraftStateType } from "./useTemplateDraft";

export const AddDraftRowButton = ({ onAdd }: DraftStateType) => {
	return (
		<Button
			data-testid="add-draft-row-button"
			onClick={onAdd}
			variant="outlined"
			sx={{ maxWidth: "200px" }}
		>
			+ Zutat
		</Button>
	);
};
