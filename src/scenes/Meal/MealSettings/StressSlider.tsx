import MoodIcon from "@mui/icons-material/Mood";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import Skeleton from "@mui/material/Skeleton";
import type { JSX } from "react";
import DebouncedSlider from "@/scenes/components/DebouncedSlider";

type StressSliderProps = {
	isLoading?: boolean;
	stressLevel: number;
	setStressLevel: (v: number) => Promise<void>;
};

export const StressSlider = ({
	isLoading,
	stressLevel,
	setStressLevel,
}: StressSliderProps) => {
	return (
		<>
			{isLoading ? (
				<Skeleton height="3rem" variant="rectangular" />
			) : (
				<DebouncedSlider
					key={stressLevel}
					label="Stress"
					onChange={setStressLevel}
					max={4}
					min={0}
					muiColorMapping={colorFromStressLevel}
					initialValue={stressLevel}
					iconMapping={iconFromStressLevel}
				/>
			)}
		</>
	);
};

const colorFromStressLevel = (stressLevel: number) => {
	switch (stressLevel) {
		case 0:
			return "success";
		case 1:
			return "primary";
		case 2:
			return "secondary";
		case 3:
			return "warning";
		default:
			return "error";
	}
};

const iconFromStressLevel = (stressLevel: number): JSX.Element => {
	switch (stressLevel) {
		case 0:
			return <MoodIcon fontSize="large" color="success" />;
		case 1:
			return <SentimentSatisfiedIcon fontSize="large" color="primary" />;
		case 2:
			return <SentimentNeutralIcon fontSize="large" color="secondary" />;
		case 3:
			return <SentimentDissatisfiedIcon fontSize="large" color="warning" />;
		default:
			return <MoodBadIcon fontSize="large" color="error" />;
	}
};
