import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { HideFiberButton } from "@/scenes/components/NutritionChart/HideFiberButton";
import { NutritionChart } from "@/scenes/components/NutritionChart/NutritionChart";
import type { Nutrition } from "@/store";
import { computeCalories } from "../../../utils/nutrition";

type ChartProps = {
	nutrition: Nutrition;
	isLoading: boolean;
};

export const SingleNutritionChart = ({ nutrition, isLoading }: ChartProps) => {
	const [hideFiber, setHideFiber] = useState(true);

	return (
		<>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						maxWidth: 500,
					}}
				>
					<HideFiberButton
						value={hideFiber}
						onClick={() => setHideFiber(!hideFiber)}
					/>
					<NutritionChart
						nutrition={nutrition}
						hideFiber={hideFiber}
						showLegend
					/>
					<Typography>{computeCalories(nutrition)}</Typography>
				</Box>
			)}
		</>
	);
};
