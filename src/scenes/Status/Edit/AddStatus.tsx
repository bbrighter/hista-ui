import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { useState } from "react";
import { Icons } from "../../components/Icons";

type AddStatusButtonsType = {
	disabled: boolean;
	onAddStatus: (date: dayjs.Dayjs) => Promise<void>;
	statusExistsToday: boolean;
	statusExistsYesterday: boolean;
	statusExistsDayBeforeYesterday: boolean;
};

export function AddStatus({
	disabled,
	onAddStatus,
	statusExistsDayBeforeYesterday,
	statusExistsToday,
	statusExistsYesterday,
}: AddStatusButtonsType) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const today = dayjs();
	const yesterday = today.subtract(1, "day");
	const dayBeforeYesterday = today.subtract(2, "day");

	const handleClickToday = () => onAddStatus(today);
	const handleClickYesterday = () => {
		onAddStatus(yesterday);
		closeMenu();
	};
	const handleClickDayBeforeYesterday = () => {
		onAddStatus(dayBeforeYesterday);
		closeMenu();
	};

	const handleClickCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<ButtonGroup>
				<Button
					variant="contained"
					onClick={handleClickToday}
					disabled={statusExistsToday || disabled}
					title="Heutigen Status hinzufügen"
				>
					+ Status heute
				</Button>
				<Button
					onClick={handleClickCalendar}
					disabled={disabled}
					title="Status hinzufügen"
				>
					<Icons.status />
				</Button>
			</ButtonGroup>
			<Menu open={open} onClose={closeMenu} anchorEl={anchorEl}>
				<MenuItem
					disabled={statusExistsYesterday}
					onClick={handleClickYesterday}
				>
					Gestern
				</MenuItem>
				<MenuItem
					disabled={statusExistsDayBeforeYesterday}
					onClick={handleClickDayBeforeYesterday}
				>
					Vorgestern
				</MenuItem>
			</Menu>
		</>
	);
}
