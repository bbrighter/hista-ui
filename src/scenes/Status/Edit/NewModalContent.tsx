import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import { useRef, useState } from "react";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";
import { Loading } from "@/scenes/components";
import type { PutStatusParams, Status } from "@/store";

type NewModalContentProps = {
	status: Status;
	onChange: (id: number, params: PutStatusParams) => Promise<void>;
};

export const NewModalContent = ({ status, onChange }: NewModalContentProps) => {
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

	const colorMapping = (v: number): string => {
		const colors = [
			"rgb(255, 0, 0)",
			"rgb(255, 128, 0)",
			"rgb(255, 255, 0)",
			"rgb(99, 199, 0)",
			"rgb(0, 131, 0)",
		];
		return v === 0 ? "rgb(160, 160, 160)" : colors[v - 1];
	};

	const color = (v: string) =>
		["sleep", "morningFitness", "eveningFitness"].includes(v)
			? "textPrimary"
			: "textSecondary";

	return (
		<Loading show={loading}>
			<Stack spacing={2}>
				{symptomSliders.map(({ key, label }) => (
					<Box key={key}>
						<Typography id="input-slider" gutterBottom color={color(key)}>
							{label}
						</Typography>
						<Slider
							value={symptoms[key]}
							min={1}
							max={5}
							onChange={(_, v) => {
								setSymptoms((prev) => ({ ...prev, [key]: v }));
							}}
							sx={{ color: colorMapping(symptoms[key]) }}
						/>
					</Box>
				))}
			</Stack>
		</Loading>
	);
};

const symptomSliders = [
	{ key: "sleep", label: "Schlaf" },
	{ key: "morningFitness", label: "Morgens" },
	{ key: "eveningFitness", label: "Abends" },
	{ key: "depressive", label: "Depressiv" },
	{ key: "tense", label: "Angespannt" },
	{ key: "moodSwings", label: "Stimmungsschwankung" },
	{ key: "irritable", label: "Reizbarkeit" },
	{ key: "lossOfInterest", label: "Interessenlosigkeit" },
	{ key: "concentration", label: "Konzentrationsschwierigkeiten" },
	{ key: "lackOfDrive", label: "Antriebsmangel" },
	{ key: "appetiteChanges", label: "Appetitveränderungen" },
	{ key: "sleepProblems", label: "Schlafstörung" },
	{ key: "overwhelmed", label: "Überwältigtsein" },
] as const;
