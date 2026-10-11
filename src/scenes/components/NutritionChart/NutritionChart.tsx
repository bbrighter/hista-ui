import { t } from "@lingui/core/macro";
import Box from "@mui/material/Box";
import { ChartsDataProvider } from "@mui/x-charts/ChartsDataProvider";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { ChartsSurface } from "@mui/x-charts/ChartsSurface";
import { PiePlot } from "@mui/x-charts/PieChart";
import type { VisibilityIdentifierWithType } from "@mui/x-charts/plugins";
import { useEffect, useRef, useState } from "react";
import type { Nutrition } from "../../../store";
import { useSpinner } from "../Loading/useSpinner";
import { NUTRITION_COLORS } from "./nutritionColors";

export type NutritionChartProps = {
	nutrition: Nutrition;
	hideFiber?: boolean;
	showLegend?: boolean;
	hiddenItems?: Array<VisibilityIdentifierWithType<"pie">>;
};

export const NutritionChart = ({
	nutrition,
	showLegend,
	hiddenItems,
}: NutritionChartProps) => {
	const [size, setSize] = useState(300);
	const ref = useRef<HTMLDivElement>(null);
	const skipAnimation = !useSpinner();

	useEffect(() => {
		const update = () => {
			if (ref.current) {
				// eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
				setSize(ref.current.offsetWidth);
			}
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	});

	const data = getNutritionChartData(nutrition);

	return (
		<Box
			data-testid="boxbox"
			ref={ref}
			sx={{ width: "100%", aspectRatio: "1 / 1", margin: "0 auto" }}
		>
			<ChartsDataProvider
				initialHiddenItems={[
					{ type: "pie", seriesId: "nutrition", dataIndex: 3 },
				]}
				hiddenItems={hiddenItems}
				width={size}
				height={size}
				series={[
					{
						id: "nutrition",
						type: "pie",
						data: data,
						arcLabel: "formattedValue",
						valueFormatter: (v) =>
							v.value.toLocaleString("de-DE", { maximumFractionDigits: 1 }),
					},
				]}
			>
				{showLegend && <ChartsLegend toggleVisibilityOnClick />}
				<ChartsSurface>
					<PiePlot skipAnimation={skipAnimation} />
				</ChartsSurface>
			</ChartsDataProvider>
		</Box>
	);
};

export const getNutritionChartData = (nutrition: Nutrition) => {
	const colors = NUTRITION_COLORS;
	const data = [
		{ id: 1, value: nutrition.fat, label: t`Fett`, color: colors[1] },
		{ id: 2, value: nutrition.protein, label: t`Eiweiß`, color: colors[3] },
		{
			id: 3,
			value: nutrition.carbohydrate,
			label: t`Kohlenhydrate`,
			color: colors[0],
		},
		{
			id: 4,
			value: nutrition.fiber,
			label: t`Ballaststoffe`,
			color: colors[2],
		},
	];

	return data;
};
