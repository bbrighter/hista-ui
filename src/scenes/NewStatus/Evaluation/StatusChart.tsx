import type { Status } from "../../../store";
import {
	type ActiveEntries,
	SERIES_CONFIG,
	type StatusMetricKey,
} from "./config";

type ChartSeries = Readonly<{ key: StatusMetricKey; color: string }>;

const CHART_CONFIG = {
	width: 200,
	xOffset: 5,
	yOffset: 5,
	ySpacing: 60,
	lineWidth: 1,
	circleRadius: 2,
	series: SERIES_CONFIG,
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
	active: ActiveEntries,
) =>
	series.map(({ key, color }) => {
		return active[key] ? (
			<polyline
				key={key}
				points={buildPointString(statuses, key)}
				stroke={color}
				strokeWidth={CHART_CONFIG.lineWidth}
				fill="none"
			/>
		) : null;
	});

const renderPoints = (
	statuses: Array<Status>,
	series: ReadonlyArray<ChartSeries>,
	active: ActiveEntries,
) =>
	statuses.map((status, index) => (
		<g key={status.id}>
			{series.map(({ key, color }) => {
				return active[key] ? (
					<circle
						key={`${status.id}-${key}`}
						cx={computeX(status[key])}
						cy={computeY(index)}
						r={CHART_CONFIG.circleRadius}
						fill={color}
					/>
				) : null;
			})}
		</g>
	));

export const StatusChart = ({
	statuses,
	active,
}: {
	statuses: Array<Status>;
	active: ActiveEntries;
}) => {
	const height =
		statuses.length * CHART_CONFIG.ySpacing + 2 * CHART_CONFIG.yOffset;

	return (
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
			{renderSeries(statuses, CHART_CONFIG.series, active)}
			{renderPoints(statuses, CHART_CONFIG.series, active)}
		</svg>
	);
};
