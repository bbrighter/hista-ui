import { Trans } from "@lingui/react/macro";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const ToggleInterval = ({
	value,
	onChange,
}: {
	value: "day" | "week" | "month" | "quarter";
	onChange: (
		_: React.MouseEvent<HTMLElement>,
		newValue: "day" | "week" | "month" | "quarter",
	) => void;
}) => {
	return (
		<ToggleButtonGroup
			sx={{ pt: 3 }}
			data-testid="toggle-interval-group"
			exclusive
			value={value}
			onChange={onChange}
			fullWidth
		>
			<ToggleButton value="day">
				<Trans comment="Calendar day">T</Trans>
			</ToggleButton>
			<ToggleButton value="week">
				<Trans comment="Calender week">W</Trans>
			</ToggleButton>
			<ToggleButton value="month">
				<Trans comment="Calendar month">M</Trans>
			</ToggleButton>
			<ToggleButton value="quarter">
				<Trans comment="Calendar quarter">Q</Trans>
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
