import PieChartIcon from "@mui/icons-material/PieChart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { Icons } from "../../components/Icons";
import { SingleNutritionChart } from "./SingleNutritionChart";
import type { NutritionChartProps } from "./useNutritionChart";

export const NutritionChartButton = ({
	nutrition,
	date,
	getStatistics,
}: NutritionChartProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		setIsLoading(true);
		getStatistics(
			"day",
			date.startOf("day").toDate(),
			date.endOf("day").toDate(),
		).finally(() => setIsLoading(false));
	}, [open, date, getStatistics]);

	return (
		<Box>
			<IconButton onClick={() => setOpen(true)} data-testid="open-chart-button">
				<PieChartIcon />
			</IconButton>
			<Dialog open={open} onClose={() => setOpen(false)} fullScreen>
				<AppBar>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => setOpen(false)}
						>
							<Icons.actions.close />
						</IconButton>
						<Typography variant="h6">{date.format("DD.MM.YYYY")}</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<SingleNutritionChart nutrition={nutrition} isLoading={isLoading} />
				</DialogContent>
			</Dialog>
		</Box>
	);
};
