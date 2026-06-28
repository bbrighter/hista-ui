import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HotelIcon from "@mui/icons-material/Hotel";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import debounce from "lodash.debounce";
import { useRef, useState } from "react";
import { actions } from "../../actions";
import { useDidUpdateEffect } from "../../hooks/useDidUpdateEffect";
import type { PutStatusParams, Status } from "../../store";

type StatusProps = { status: Status };

export const Morning = ({ status }: StatusProps) => {
	const [morningFitness, setMorningFitness] = useState<number>(
		status.morningFitness || 0,
	);
	const [morningSleep, setMorningSleep] = useState<number>(
		status.morningSleep || 0,
	);

	const debouncedUpdate = useRef(
		debounce(async (params) => {
			await actions.status.patch(status.id, params);
		}, 1000),
	).current;

	useDidUpdateEffect(() => {
		const params: PutStatusParams = {
			date: status.date,
			statusId: status.id,
			morningFitness: morningFitness,
			morningSleep: morningSleep,
		};
		debouncedUpdate(params);
	}, [morningFitness, morningSleep]);

	return (
		<Stack spacing={2} sx={{ minWidth: "250px" }}>
			<Stack direction="row" spacing={2}>
				<SleepIcon sleep={morningSleep} />
				<Slider
					data-testid="morning-sleep-slider"
					min={1}
					max={5}
					value={morningSleep ?? 0}
					onChange={(_, v) => setMorningSleep(v)}
					sx={{ color: colorMapping(morningSleep) }}
				/>
			</Stack>
			<Stack direction="row" spacing={2}>
				<FitnessIcon fitness={morningFitness} />
				<Slider
					data-testid="morning-fitness-slider"
					min={1}
					max={5}
					value={morningFitness}
					onChange={(_, v) => setMorningFitness(v)}
					sx={{ color: colorMapping(morningFitness) }}
				/>
			</Stack>
		</Stack>
	);
};

export const Evening = ({ status }: StatusProps) => {
	const [eveningFitness, setEveningFitness] = useState<number>(
		status.eveningFitness || 0,
	);

	const debouncedUpdate = useRef(
		debounce(async (params) => {
			await actions.status.patch(status.id, params);
		}, 1000),
	).current;

	useDidUpdateEffect(() => {
		const params: PutStatusParams = {
			date: status.date,
			statusId: status.id,
			eveningFitness: eveningFitness,
		};
		debouncedUpdate(params);
	}, [eveningFitness]);

	return (
		<Stack>
			<Stack spacing={2} direction="row">
				<FitnessIcon fitness={eveningFitness} />
				<Slider
					data-testid="evening-fitness-slider"
					min={1}
					max={5}
					value={eveningFitness}
					onChange={(_, v) => setEveningFitness(v)}
					sx={{ color: colorMapping(eveningFitness) }}
				/>
			</Stack>
		</Stack>
	);
};

const SleepIcon = ({ sleep }: { sleep: number }) => {
	return (
		<HotelIcon
			sx={{ margin: "4px", color: colorMapping(sleep) }}
			titleAccess="Schlaf"
		/>
	);
};
const FitnessIcon = ({ fitness }: { fitness: number }) => {
	return (
		<FitnessCenterIcon
			sx={{ margin: "4px", color: colorMapping(fitness) }}
			titleAccess="Fitness"
		/>
	);
};

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
