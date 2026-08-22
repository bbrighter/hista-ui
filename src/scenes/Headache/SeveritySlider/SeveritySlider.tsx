import Typography from "@mui/material/Typography";
import DebouncedSlider from "@/scenes/components/DebouncedSlider/DebouncedSlider";
import { getColor } from "./colorMapping";

type SeveritySliderProps = {
	severity: number;
	onSeverityChange: (v: number) => void;
};

export const SeveritySlider = ({
	severity,
	onSeverityChange,
}: SeveritySliderProps) => {
	const iconMapping = (value: number) => {
		return (
			<Typography
				sx={{
					borderRadius: "50%",
					width: "2rem",
					height: "2rem",
					backgroundColor: getColor(value),
					color: "black",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "1.2rem",
					fontWeight: "bold",
				}}
				data-testid="slider-icon"
			>
				{value}
			</Typography>
		);
	};

	return (
		<DebouncedSlider
			initialValue={severity}
			onChange={onSeverityChange}
			label="Schwere"
			min={0}
			max={10}
			colorMapping={getColor}
			iconMapping={iconMapping}
		/>
	);
};
