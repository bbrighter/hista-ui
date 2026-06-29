import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
	type ActiveEntries,
	SERIES_CONFIG,
	type StatusMetricKey,
} from "./config";

export const Legend = ({
	onClick,
	active,
}: {
	onClick: (key: StatusMetricKey) => void;
	active: ActiveEntries;
}) => {
	const gray = "rgb(128, 128, 128)";

	return (
		<Stack direction="row" spacing={2}>
			{SERIES_CONFIG.map((c) => (
				<Stack
					key={c.key}
					direction="row"
					sx={{ alignItems: "center", display: "flex" }}
				>
					<Rectangle
						color={active[c.key] ? c.color : gray}
						onClick={() => onClick(c.key)}
					/>
					<Typography sx={{ pl: "0.5rem", pr: "1rem" }}>{c.label}</Typography>
				</Stack>
			))}
		</Stack>
	);
};

const Rectangle = styled.div`
    background-color: ${(props) => props.color};
    height: 2rem;
    width: 2rem;
    border-radius: 4px;
`;
