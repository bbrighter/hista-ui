import { t } from "@lingui/core/macro";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { NUTRITION_COLORS } from "@/scenes/components/NutritionChart/nutritionColors";

export const NutritionLegend = ({ hideFiber }: { hideFiber: boolean }) => {
	const nutrition_legend = [
		{ id: 0, label: t`K`, color: NUTRITION_COLORS[0] },
		{ id: 1, label: t`F`, color: NUTRITION_COLORS[1] },
		{ id: 3, label: t`E`, color: NUTRITION_COLORS[3] },
	];

	if (!hideFiber) {
		nutrition_legend.push({ id: 2, label: t`B`, color: NUTRITION_COLORS[2] });
	}

	return (
		<Paper
			data-testid="nutrition-legend"
			elevation={3}
			sx={{ display: "flex", gap: 2, flexWrap: "wrap", px: 1 }}
		>
			{nutrition_legend.map((item) => (
				<Box
					key={item.id}
					sx={{ display: "flex", alignItems: "center", gap: 1 }}
				>
					<Box
						sx={{
							width: "1rem",
							height: "1rem",
							backgroundColor: item.color,
							borderColor: "ButtonBorder",
							mb: "4px",
						}}
					/>
					<Typography sx={{ fontSize: "1rem" }}>{item.label}</Typography>
				</Box>
			))}
		</Paper>
	);
};
