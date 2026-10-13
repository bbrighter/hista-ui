import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { VisibilityIdentifierWithType } from "@mui/x-charts/plugins";
import { useState } from "react";
import { ProgressIndicator } from "@/scenes/components/Loading/ProgressIndicator";
import { NutritionChart } from "@/scenes/components/NutritionChart/NutritionChart";
import { NutritionLegend } from "@/scenes/components/NutritionChart/NutritionLegend";
import { NUTRITIONS } from "@/scenes/components/NutritionChart/nutritionColors";
import type { Nutrition } from "@/store";
import { computeCalories } from "../../../utils/nutrition";

type ChartProps = {
	nutrition: Nutrition;
	isLoading: boolean;
};

export const SingleNutritionChart = ({ nutrition, isLoading }: ChartProps) => {
	const [hiddenItems, setHiddenItems] = useState<
		Array<VisibilityIdentifierWithType<"pie">>
	>([{ type: "pie", seriesId: "nutrition", dataIndex: NUTRITIONS.fiber.id }]);
	const onLegendClick = (idx: number) => {
		setHiddenItems((prev) =>
			prev.some((p) => p.dataIndex === idx)
				? prev.filter((p) => p.dataIndex !== idx)
				: [...prev, { type: "pie", seriesId: "nutrition", dataIndex: idx }],
		);
	};
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
					<NutritionLegend
						onEntryClick={onLegendClick}
						hiddenItemIds={hiddenItems.map((it) => it.dataIndex ?? 0)}
					/>
					<NutritionChart nutrition={nutrition} hiddenItems={hiddenItems} />
					<Typography>{computeCalories(nutrition)}</Typography>
				</Box>
			)}
		</>
	);
};
