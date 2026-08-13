import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import { useRef, useState } from "react";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";
import { Loading } from "@/scenes/components";
import type { PutStatusParams, Status } from "@/store";

type StatusSlidersProps = {
	status: Status;
	onChange: (id: number, params: PutStatusParams) => Promise<void>;
};

export const StatusSliders = ({ status, onChange }: StatusSlidersProps) => {
	type SymptomKey = (typeof symptomSliders)[number]["key"];

	const [loading, setLoading] = useState(false);
	const [symptoms, setSymptoms] = useState<Record<SymptomKey, number>>({
		sleep: status.morningSleep ?? 0,
		morningFitness: status.morningFitness ?? 0,
		eveningFitness: status.eveningFitness ?? 0,
		depressive: 0,
		tense: 0,
		moodSwings: 0,
		irritable: 0,
		lossOfInterest: 0,
		concentration: 0,
		lackOfDrive: 0,
		appetiteChanges: 0,
		sleepProblems: 0,
		overwhelmed: 0,
	});

	const debouncedUpdate = useRef(
		debounce(async (params: PutStatusParams) => {
			setLoading(true);
			await onChange(status.id, params);
			setLoading(false);
		}, 1000),
	).current;

	useDidUpdateEffect(() => {
		const params: PutStatusParams = {
			date: status.date,
			statusId: status.id,
			morningFitness: symptoms.morningFitness,
			morningSleep: symptoms.sleep,
			eveningFitness: symptoms.eveningFitness,
		};
		debouncedUpdate(params);
	}, [symptoms.sleep, symptoms.morningFitness, symptoms.eveningFitness]);

	const colorMapping = (v: number, direction: "up" | "down"): string => {
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

		return v === 0 ? "rgb(160, 160, 160)" : colors[v - 1];
	};

	const color = (v: string) =>
		["sleep", "morningFitness", "eveningFitness"].includes(v)
			? "textPrimary"
			: "textSecondary";

	return (
		<Loading show={loading}>
			<Grid container spacing={2}>
				{symptomSliders.map(({ key, label, positiveDirection, divider }) => (
					<>
						<Grid key={key} size={12} container>
							<Grid size={{ xs: 6, sm: 12 }}>
								<Typography
									id="input-slider"
									gutterBottom
									color={color(key)}
									noWrap
									sx={{ pt: "0.75rem" }}
									onClick={() => console.log("click")}
								>
									{label}
								</Typography>
							</Grid>
							<Grid size={{ xs: 6, sm: 12 }}>
								<Slider
									value={symptoms[key]}
									min={1}
									max={5}
									onChange={(_, v) => {
										setSymptoms((prev) => ({ ...prev, [key]: v }));
									}}
									sx={{
										color: colorMapping(symptoms[key], positiveDirection),
										maxWidth: "50%",
									}}
								/>
							</Grid>
							{divider === "below" && (
								<Grid size={12}>
									<Divider />
								</Grid>
							)}
						</Grid>
					</>
				))}
			</Grid>
		</Loading>
	);
};

type SymptomSlider = {
	key: string;
	label: string;
	positiveDirection: "up" | "down";
	divider?: "below";
};

const symptomSliders: SymptomSlider[] = [
	{ key: "sleep", label: "Schlaf", positiveDirection: "up" },
	{ key: "morningFitness", label: "Morgens", positiveDirection: "up" },
	{
		key: "eveningFitness",
		label: "Abends",
		positiveDirection: "up",
		divider: "below",
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
		key: "concentration",
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
