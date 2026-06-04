import Grid from "@mui/material/Grid";
import type dayjs from "dayjs";

import DateInput from "../../../components/DateInput";

export function StatisticsDateInput(props: {
	fromDate: Date;
	toDate: Date;
	handleFromDateChange: (value: dayjs.Dayjs | null) => void;
	handleToDateChange: (value: dayjs.Dayjs | null) => void;
}) {
	return (
		<Grid container>
			<Grid size={{ xs: 6 }}>
				<DateInput
					title="Von"
					onChange={props.handleFromDateChange}
					date={props.fromDate}
					hideTime
				/>
			</Grid>
			<Grid size={{ xs: 6 }}>
				<DateInput
					title="Bis"
					onChange={props.handleToDateChange}
					date={props.toDate}
					hideTime
				/>
			</Grid>
		</Grid>
	);
}
