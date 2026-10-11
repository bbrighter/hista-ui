import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ProgressIndicator } from "@/scenes/components/Loading/ProgressIndicator";
import { NutritionChart } from "@/scenes/components/NutritionChart/NutritionChart";
import type { Nutrition } from "@/store";
import { computeCalories } from "../../../utils/nutrition";

type ChartProps = {
	nutrition: Nutrition;
	isLoading: boolean;
};

export const SingleNutritionChart = ({ nutrition, isLoading }: ChartProps) => {
	return (
		<>
			{isLoading ? (
				<ProgressIndicator />
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						maxWidth: 500,
					}}
				>
					<NutritionChart nutrition={nutrition} showLegend />
					<Typography>{computeCalories(nutrition)}</Typography>
				</Box>
			)}
		</>
	);
};
