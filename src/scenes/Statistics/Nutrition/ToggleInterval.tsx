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
			<ToggleButton value="day">T</ToggleButton>
			<ToggleButton value="week">W</ToggleButton>
			<ToggleButton value="month">M</ToggleButton>
			<ToggleButton value="quarter">Q</ToggleButton>
		</ToggleButtonGroup>
	);
};
