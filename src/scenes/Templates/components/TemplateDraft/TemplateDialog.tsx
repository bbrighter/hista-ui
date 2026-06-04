import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Icons } from "../../../components/Icons";
import { AddDraftRowButton } from "./AddDraftRowButton";
import { DraftRow } from "./DraftRow";
import { NameInput } from "./NameInput";
import { SaveTemplateButton } from "./SaveTemplateButton";
import { useTemplateDraft } from "./useTemplateDraft";

type Props = Omit<DialogProps, "onClose"> & {
	onClose: () => void;
	templateId?: null | number;
};

export const TemplateDialog = ({ open, onClose, templateId }: Props) => {
	const draftState = useTemplateDraft(templateId);

	return (
		<Dialog fullScreen open={open} onClose={onClose}>
			<AppBar>
				<Toolbar>
					<IconButton onClick={onClose}>
						<Icons.actions.close />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6">
						Vorlage erstellen
					</Typography>
					<SaveTemplateButton
						{...draftState}
						onSaved={onClose}
						id={templateId}
					/>
				</Toolbar>
			</AppBar>
			<Container sx={{ pt: "6rem" }}>
				<NameInput {...draftState} />
				<Stack spacing={1}>
					{draftState.draft.map((_, index) => (
						<DraftRow
							key={
								String(draftState.draft[index].ingredient?.id) +
								draftState.draft[index].condition +
								// biome-ignore lint/suspicious/noArrayIndexKey: I have no better idea what to use! TODO: Improve
								index
							}
							{...draftState}
							index={index}
						/>
					))}
					<AddDraftRowButton {...draftState} />
				</Stack>
			</Container>
		</Dialog>
	);
};
