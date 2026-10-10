import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import { useState } from "react";
import { Button } from "@/scenes/components/Loading/Button";
import type { Nutrition } from "../../../store";
import { Icons } from "../../components/Icons";
import { NumberDecimalInput } from "../../components/NumberDecimalInput";

export const EditNutritionButton = ({
	ingredientId,
	nutrition,
	updateNutrition,
	...other
}: IconButtonProps & {
	ingredientId: number;
	nutrition?: Nutrition;
	updateNutrition: (id: number, nutrition: Nutrition) => Promise<void>;
}) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const onClose = () => setOpen(false);

	const [carbohydrate, setCarbohydrate] = useState(
		nutrition?.carbohydrate ?? null,
	);
	const [protein, setProtein] = useState(nutrition?.protein ?? null);
	const [fat, setFat] = useState(nutrition?.fat ?? null);
	const [fiber, setFiber] = useState(nutrition?.fiber ?? null);

	const isFilled =
		carbohydrate !== null && protein !== null && fat !== null && fiber !== null;
	const canBeSaved =
		isFilled &&
		carbohydrate <= 100 &&
		protein <= 100 &&
		fat <= 100 &&
		fiber <= 100;

	const onSave = async () => {
		if (!isFilled) return;

		setLoading(true);
		await updateNutrition(ingredientId, {
			carbohydrate,
			protein,
			fat,
			fiber,
		});
		setLoading(false);
		setOpen(false);
	};

	const nutritions = [
		{ value: fat, onChange: setFat, label: t`Fett` },
		{ value: carbohydrate, onChange: setCarbohydrate, label: t`Kohlenhydrate` },
		{ value: fiber, onChange: setFiber, label: t`Ballaststoffe` },
		{ value: protein, onChange: setProtein, label: t`Eiweiß` },
	];

	return (
		<>
			<IconButton
				title={t`Nährwerte`}
				onClick={() => setOpen(true)}
				data-testid="editNutritionButton"
				color={isFilled ? "success" : "default"}
				{...other}
			>
				<Icons.nutrition />
			</IconButton>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>
					<Trans>Nährwerte pro 100 g</Trans>
				</DialogTitle>
				<DialogContent>
					<Box
						component="form"
						sx={{ display: "flex", flexDirection: "column", gap: 3 }}
					>
						{nutritions.map((n) => (
							<NumberDecimalInput
								key={n.label}
								value={n.value}
								onValueChange={n.onChange}
								variant="standard"
								label={n.label}
								unit={t`g`}
								min={0}
							/>
						))}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						disabled={!canBeSaved}
						onClick={onSave}
						loading={loading}
					>
						<Trans>Speichern</Trans>
					</Button>
					<Button onClick={onClose}>
						<Trans>Abbrechen</Trans>
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
