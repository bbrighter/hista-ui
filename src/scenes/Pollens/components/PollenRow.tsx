import styled from "@emotion/styled";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { Pollen } from "../../../store";
import {
	FIRST_COLUMN_WIDTH,
	intensityToColor,
	POLLEN_TYPES,
} from "./pollen_helper";

export default function PollenRow(props: { pollen: Pollen }) {
	return (
		<ListItem>
			<Paper sx={{ width: FIRST_COLUMN_WIDTH }}>
				<Typography>{props.pollen.date.toLocaleDateString("de-DE")}</Typography>
			</Paper>
			{POLLEN_TYPES.map(({ key }) => (
				<StyledPollen
					intensity={props.pollen[key].intensity}
					key={key}
					data-testid={`pollen-cell-${key}`}
				/>
			))}
		</ListItem>
	);
}

type StyledPollenProps = {
	intensity: number;
};

const StyledPollen = styled.span<StyledPollenProps>`
        background-color: ${(props) => intensityToColor(props.intensity)};
        border-radius: 5px;
        width: max(10%, 20px);      
        height: 1.5rem;
        margin-left: 2px;
    `;
