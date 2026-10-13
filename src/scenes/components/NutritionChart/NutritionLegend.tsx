import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { darken } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { NUTRITIONS } from "@/scenes/components/NutritionChart/nutritionColors";

export const NutritionLegend = ({
	onEntryClick,
	hiddenItemIds,
}: {
	onEntryClick: (idx: number) => void;
	hiddenItemIds: Array<number>;
}) => {
	const isHidden = (id: number) => hiddenItemIds.some((h) => h === id);

	const nutrition_legend = Object.values(NUTRITIONS).map((e) => ({
		...e,
		color: isHidden(e.id) ? darken(e.color, 0.5) : e.color,
	}));

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
					onClick={() => onEntryClick(item.id)}
					aria-selected={!isHidden(item.id)}
					data-testid={`nutrition-legend-${item.id}`}
				>
					<Box
						sx={{
							width: "1.5rem",
							height: "1.5rem",
							backgroundColor: item.color,
							borderColor: "ButtonBorder",
							margin: "0.5rem",
						}}
					/>
					<Typography
						sx={{ fontSize: "1rem" }}
						color={isHidden(item.id) ? "textDisabled" : "textPrimary"}
					>
						{item.shortName}
					</Typography>
				</Box>
			))}
		</Paper>
	);
};
