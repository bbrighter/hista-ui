import dayjs from "dayjs"
import { Grid } from "@mui/material"
import DateInput from "../../components/DateIpnut"


export default function StatisticsDateInput(props: {
    fromDate: Date
    toDate: Date
    handleFromDateChange: (value: dayjs.Dayjs | null) => void
    handleToDateChange: (value: dayjs.Dayjs | null) => void
}) {

    return (
        <Grid container>
            <Grid item xs={6}>
                <DateInput
                    title="Von"
                    onChange={props.handleFromDateChange}
                    date={props.fromDate}
                    hideTime
                />
            </Grid>
            <Grid item xs={6}>
                <DateInput
                    title="Bis"
                    onChange={props.handleToDateChange}
                    date={props.toDate}
                    hideTime
                />
            </Grid>
        </Grid>
    )
}