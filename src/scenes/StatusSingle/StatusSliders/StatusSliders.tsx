import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import type { PutStatusParams } from "@/store";
import type { SymptomKey } from "../symptomValues";

type Symptoms = Omit<PutStatusParams, "statusId" | "date" | "crash">;

type StatusSlidersProps = {
	symptoms: Symptoms;
	setSymptoms: (symptoms: Symptoms) => void;
	isDirty: (key: SymptomKey) => boolean;
};

export const StatusSliders = ({
	symptoms,
	setSymptoms,
	isDirty,
}: StatusSlidersProps) => {
	const colorMapping = (v: number | null, direction: "up" | "down"): string => {
		const colors = [
			"rgb(255, 0, 0)",
			"rgb(255, 128, 0)",
			"rgb(255, 255, 0)",
			"rgb(99, 199, 0)",
			"rgb(0, 131, 0)",
		];
		if (direction === "down") {
			colors.reverse();
		}

		return v === 0 || v === null ? "rgb(160, 160, 160)" : colors[v - 1];
	};

	return (
		<Grid container spacing={2}>
			{symptomSliders.map(({ key, label, positiveDirection }) => (
				<Grid key={key} size={12} container>
					<Grid size={12}>
						<Typography
							id="input-slider"
							gutterBottom
							noWrap
							sx={{ pt: "0.75rem" }}
						>
							{label}
						</Typography>
					</Grid>
					<Grid size={11}>
						<Slider
							value={symptoms[key] ?? 0}
							min={1}
							max={5}
							onChange={(_, v) => {
								setSymptoms({ ...symptoms, [key]: v });
							}}
							sx={{
								color: colorMapping(symptoms[key], positiveDirection),
								maxWidth: "200px",
							}}
						/>
					</Grid>
					<Grid size={1}>
						{isDirty(key) && (
							<Icon
								color="disabled"
								sx={{ mt: "0.4rem" }}
								data-testid="dirty-status-icon"
							>
								<HourglassBottomIcon />
							</Icon>
						)}
					</Grid>
				</Grid>
			))}
		</Grid>
	);
};

type SymptomSlider = {
	key: SymptomKey;
	label: string;
	positiveDirection: "up" | "down";
};

const symptomSliders: SymptomSlider[] = [
	{ key: "morningSleep", label: "Schlaf", positiveDirection: "up" },
	{ key: "morningFitness", label: "Morgens", positiveDirection: "up" },
	{ key: "dayFitness", label: "Tagsüber", positiveDirection: "up" },
	{
		key: "eveningFitness",
		label: "Abends",
		positiveDirection: "up",
	},
	{
		key: "depressive",
		label: "Depressive Verstimmung, selbstabwertende Gedanken",
		positiveDirection: "down",
	},
	{
		key: "tense",
		label: "Anspannung, Ängstlichkeit oder Gefühl des Aufgedrehtseins",
		positiveDirection: "down",
	},
	{
		key: "moodSwings",
		label: "Stimmungsschwankungen, gesteigerte Empfindlichkeit",
		positiveDirection: "down",
	},
	{
		key: "irritable",
		label: "Reizbarkeit, Wut, Ärger, vermehrte Konflikte",
		positiveDirection: "down",
	},
	{
		key: "lossOfInterest",
		label: "Interessenlosigkeit für übliche Aktivitäten",
		positiveDirection: "down",
	},
	{
		key: "concentrationProblems",
		label: "Konzentrationsschwierigkeiten",
		positiveDirection: "down",
	},
	{
		key: "lackOfDrive",
		label: "Leichte Ermüdbarkeit, Energieverlust, Antriebsmangel",
		positiveDirection: "down",
	},
	{
		key: "appetiteChanges",
		label: "Appetitveränderungen, Verlangen nach speziellen Lebensmitteln",
		positiveDirection: "down",
	},
	{
		key: "sleepProblems",
		label: "Schlafstörung (zu viel, zu wenig, unruhig, etc.)",
		positiveDirection: "down",
	},
	{
		key: "overwhelmed",
		label: "Gefühl, die Kontrolle zu verlieren; Gefühl des Überwältigtseins",
		positiveDirection: "down",
	},
] as const;
