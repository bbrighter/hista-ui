import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Status } from "../../../store";
import { Evening, Morning } from "./Sliders";

export const StatusModal = ({
	open,
	onClose,
	status,
}: {
	open: boolean;
	onClose: () => void;
	status: Status | undefined;
}) => {
	if (!status) return null;

	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>{status.date.format("DD.MM.YYYY")}</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Box>
						<Typography>Morgens</Typography>
						<Morning status={status} />
					</Box>
					<Divider />
					<Box>
						<Typography>Abends</Typography>
						<Evening status={status} />
					</Box>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
