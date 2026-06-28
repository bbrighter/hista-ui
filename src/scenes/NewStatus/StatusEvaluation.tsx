import Container from "@mui/material/Container";
import type { Status } from "../../store";

type StatusMetricKey = "morningFitness" | "eveningFitness" | "morningSleep";

type ChartSeries = Readonly<{ key: StatusMetricKey; color: string }>;

const CHART_CONFIG = {
	width: 200,
	xOffset: 5,
	yOffset: 5,
	ySpacing: 60,
	lineWidth: 1,
	circleRadius: 2,
	series: [
		{ key: "morningFitness", color: "rgb(240, 205, 64)" },
		{ key: "eveningFitness", color: "rgb(218, 80, 0)" },
		{ key: "morningSleep", color: "rgb(63, 0, 211)" },
	] as const,
};

const computeX = (value: number | null | undefined) => {
	if (value == null) return CHART_CONFIG.xOffset;
	return (value - 1) * (CHART_CONFIG.width / 5) + CHART_CONFIG.xOffset;
};

const computeY = (index: number) =>
	index * CHART_CONFIG.ySpacing + CHART_CONFIG.yOffset;

const buildPointString = (statuses: Array<Status>, key: StatusMetricKey) =>
	statuses
		.map((status, index) => `${computeX(status[key])},${computeY(index)}`)
		.join(" ");

const renderSeries = (
	statuses: Array<Status>,
	series: ReadonlyArray<ChartSeries>,
) =>
	series.map(({ key, color }) => {
		return (
			<polyline
				key={key}
				points={buildPointString(statuses, key)}
				stroke={color}
				strokeWidth={CHART_CONFIG.lineWidth}
				fill="none"
			/>
		);
	});

const renderPoints = (
	statuses: Array<Status>,
	series: ReadonlyArray<ChartSeries>,
) =>
	statuses.map((status, index) => (
		<g key={status.id}>
			{series.map(({ key, color }) => (
				<circle
					key={`${status.id}-${key}`}
					cx={computeX(status[key])}
					cy={computeY(index)}
					r={CHART_CONFIG.circleRadius}
					fill={color}
				/>
			))}
		</g>
	));

export const StatusEvaluation = ({ statuses }: { statuses: Array<Status> }) => {
	const height =
		statuses.length * CHART_CONFIG.ySpacing + 2 * CHART_CONFIG.yOffset;

	return (
		<Container sx={{ padding: "2rem" }}>
			<svg
				viewBox={`0 0 ${CHART_CONFIG.width} ${height}`}
				aria-label="chart"
				style={{
					width: "100%",
					height: "auto",
					margin: "4rem",
					display: "block",
				}}
			>
				{renderSeries(statuses, CHART_CONFIG.series)}
				{renderPoints(statuses, CHART_CONFIG.series)}
			</svg>
		</Container>
	);
};
