import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
	LeadingActions,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";

import { Icons } from "../Icons";

export const swipeDeleteItem = (onDelete: () => Promise<void>) => {
	const [open, setOpen] = useState(false);
	const onClick = () => setOpen(true);
	return (
		<>
			<TrailingActions>
				<SwipeAction onClick={onClick}>
					<Button
						data-testid="delete-button"
						variant="contained"
						color="error"
						startIcon={<Icons.actions.delete />}
					/>
				</SwipeAction>
			</TrailingActions>
			<Dialog open={open}>
				<DialogTitle>Wirklich löschen?</DialogTitle>
				<DialogActions>
					<Button
						variant="contained"
						color="error"
						startIcon={<Icons.today />}
						onClick={() => {
							onDelete();
							setOpen(false);
						}}
					>
						Löschen
					</Button>
					<Button onClick={() => setOpen(false)}>Abbrechen</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export const swipeSetNow = (onSwipe: () => Promise<void>) => {
	return (
		<LeadingActions>
			<SwipeAction onClick={onSwipe}>
				<Button
					data-testid="set-now-button"
					variant="contained"
					startIcon={<Icons.today />}
					color="secondary"
				>
					Jetzt
				</Button>
			</SwipeAction>
		</LeadingActions>
	);
};
