import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Nutrition } from "@/store";

export const MealNutrition = ({
	protein,
	fat,
	carbohydrate,
	fiber,
}: Nutrition) => {
	const indicators = [
		{ label: "F", value: fat },
		{ label: "K", value: carbohydrate },
		{ label: "B", value: fiber },
		{ label: "E", value: protein },
	];

	return (
		<Paper
			data-testid="nutrition-kpis"
			sx={{ px: "0.5rem", py: "0.25rem", mb: "1rem" }}
		>
			<Grid
				container
				columnSpacing={4}
				direction="row"
				sx={{ justifyContent: "space-between" }}
			>
				{indicators.map((i) => (
					<Grid key={i.label} size={3}>
						<Stack
							direction="row"
							spacing={0.5}
							sx={{ justifyContent: "space-between" }}
						>
							<Typography color="textDisabled">{i.label}</Typography>
							<Typography sx={{ whiteSpace: "nowrap" }}>
								{i.value.toLocaleString("de-DE", { maximumFractionDigits: 1 })}{" "}
								g
							</Typography>
						</Stack>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};
