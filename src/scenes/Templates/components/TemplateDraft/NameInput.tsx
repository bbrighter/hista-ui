import { t } from "@lingui/core/macro";
import TextField from "@mui/material/TextField";
import type { DraftStateType } from "./useTemplateDraft";

export const NameInput = ({ name, onChangeName }: DraftStateType) => {
	return (
		<TextField
			data-testid="name-input"
			sx={{ mb: "2rem" }}
			label={t`Name`}
			value={name}
			onChange={(e) => onChangeName(e.currentTarget.value)}
		/>
	);
};
