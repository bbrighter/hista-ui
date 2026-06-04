import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Skeleton from "@mui/material/Skeleton";

import { Freshness } from "../../../../store";
import DebouncedSlider from "../../../components/DebouncedSlider";

type FreshnessSliderProps = {
	isLoading?: boolean;
	freshness: number;
	setFreshness: (v: number) => Promise<void>;
};

export const FreshnessSlider = ({
	isLoading,
	freshness,
	setFreshness,
}: FreshnessSliderProps) => {
	return (
		<>
			{isLoading ? (
				<Skeleton variant="rectangular" height="3rem" />
			) : (
				<DebouncedSlider
					key={freshness}
					label="Frische"
					onChange={setFreshness}
					max={2}
					min={0}
					muiColorMapping={colorFromFreshness}
					initialValue={freshness}
					iconMapping={iconFromFreshness}
				/>
			)}
		</>
	);
};

const colorFromFreshness = (freshness: Freshness) => {
	switch (freshness) {
		case Freshness.fresh:
			return "success";
		case Freshness.sameDay:
			return "primary";
		case Freshness.old:
			return "error";
	}
};

const iconFromFreshness = (freshness: Freshness) => {
	switch (freshness) {
		case Freshness.fresh:
			return <LunchDiningIcon color="success" />;
		case Freshness.sameDay:
			return <LunchDiningIcon color="primary" />;
		case Freshness.old:
			return <LunchDiningIcon color="error" />;
	}
};
