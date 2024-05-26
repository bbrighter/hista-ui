import { Grid, Icon, Slider } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { colorFromSeverity } from "../../../store/symptom/condition";

export default function SeverityFilter(props: {
    severity: Array<number>,
    onChange: ((event: Event, value: number | Array<number>, activeThumb: number) => void)
}) {
    return (
        <Grid container>
            <Grid item xs={2}>
                <Icon>
                    <FilterAltIcon />
                </Icon>
            </Grid>
            <Grid item xs={10}>
                <Slider
                    max={5}
                    min={1}
                    step={1}
                    value={props.severity}
                    color={colorFromSeverity(props.severity)}
                    onChange={props.onChange}
                />
            </Grid>
        </Grid>
    )
}