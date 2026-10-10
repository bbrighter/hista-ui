import { Trans } from "@lingui/react/macro";
import { useState } from "react";
import { Button } from "@/scenes/components/Loading/Button";
import { Icons } from "../../components/Icons";
import { TemplateDialog } from "./TemplateDraft";

export const AddTemplate = () => {
	const [open, setOpen] = useState(false);
	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);

	return (
		<>
			<Button
				variant="contained"
				startIcon={<Icons.template />}
				onClick={onOpen}
			>
				<Trans>Neue Vorlage</Trans>
			</Button>
			<TemplateDialog open={open} onClose={onClose} />
		</>
	);
};
