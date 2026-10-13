import Box from "@mui/material/Box";
import { ChartsDataProvider } from "@mui/x-charts/ChartsDataProvider";
import { ChartsSurface } from "@mui/x-charts/ChartsSurface";
import { PiePlot } from "@mui/x-charts/PieChart";
import type { VisibilityIdentifierWithType } from "@mui/x-charts/plugins";
import { useEffect, useRef, useState } from "react";
import type { Nutrition } from "../../../store";
import { useSpinner } from "../Loading/useSpinner";
import { NUTRITIONS } from "./nutritionColors";

export type NutritionChartProps = {
	nutrition: Nutrition;
	hiddenItems?: Array<VisibilityIdentifierWithType<"pie">>;
};

export const NutritionChart = ({
	nutrition,
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
				<ChartsSurface>
					<PiePlot skipAnimation={skipAnimation} />
				</ChartsSurface>
			</ChartsDataProvider>
		</Box>
	);
};

export const getNutritionChartData = (nutrition: Nutrition) => {
	return Object.entries(NUTRITIONS).map(([k, v]) => ({
		value: nutrition[k as keyof Nutrition],
		...v,
	}));
};
