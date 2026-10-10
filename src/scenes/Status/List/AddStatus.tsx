import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "@/scenes/components/Loading/Button";
import { Icons } from "../../components/Icons";

type AddStatusButtonsType = {
	disabled: boolean;
	onAddStatus: (date: dayjs.Dayjs) => Promise<void>;
	statusExistsToday: boolean;
	statusExistsYesterday: boolean;
	statusExistsDayBefore: boolean;
};

export function AddStatus({
	disabled,
	onAddStatus,
	statusExistsDayBefore,
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
					data-testid="addStatusButton"
				>
					<Trans>+ Status heute</Trans>
				</Button>
				<Button
					onClick={handleClickCalendar}
					disabled={disabled}
					title={t`Status hinzufügen`}
					data-testid="statusMenuButton"
				>
					<Icons.status />
				</Button>
			</ButtonGroup>
			<Menu open={open} onClose={closeMenu} anchorEl={anchorEl}>
				<MenuItem
					disabled={statusExistsYesterday}
					onClick={handleClickYesterday}
				>
					<Trans>Gestern</Trans>
				</MenuItem>
				<MenuItem
					disabled={statusExistsDayBefore}
					onClick={handleClickDayBeforeYesterday}
				>
					<Trans>Vorgestern</Trans>
				</MenuItem>
			</Menu>
		</>
	);
}
