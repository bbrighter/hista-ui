import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Slider from "@mui/material/Slider";

import { colorFromSeverity } from "../../../../store";

export default function SeverityFilter({
	severity,
	onChange,
}: {
	severity: Array<number>;
	onChange: (
		event: Event,
		value: number | Array<number>,
		activeThumb: number,
	) => void;
}) {
	return (
		<Grid container sx={{ mt: 2 }}>
			<Grid size={{ xs: 2 }}>
				<Icon>
					<FilterAltIcon />
				</Icon>
			</Grid>
			<Grid size={{ xs: 8 }}>
				<Slider
					max={5}
					min={1}
					step={1}
					value={severity}
					color={colorFromSeverity(severity)}
					onChange={onChange}
					marks={true}
					data-testid="severityFilter"
				/>
			</Grid>
		</Grid>
	);
}
