import { Trans } from "@lingui/react/macro";
import { Button } from "@/scenes/components/Loading/Button";

import type { DraftStateType } from "./useTemplateDraft";

export const AddDraftRowButton = ({ onAdd }: DraftStateType) => {
	return (
		<Button
			data-testid="add-draft-row-button"
			onClick={onAdd}
			variant="outlined"
			sx={{ maxWidth: "200px" }}
		>
			<Trans>+ Zutat</Trans>
		</Button>
	);
};
