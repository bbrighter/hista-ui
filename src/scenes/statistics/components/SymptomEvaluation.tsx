import { Grid, Paper, Typography } from "@mui/material"
import useHista from "../../../store/store"

export default function SymptomEvaluation() {
    const statistics = useHista(state => state.statistics)
    const countByTimeRange = statistics.map(stat => ({
        symptomId: stat.symptomId,
        within1h: stat.statistics.filter(stat => (stat.foodDate.getTime() - stat.symptomDate.getTime() < 1000 * 60 * 60 * 1)).length,
        within24h: stat.statistics.filter(stat => (stat.foodDate.getTime() - stat.symptomDate.getTime() < 1000 * 60 * 60 * 24)).length,
        within72h: stat.statistics.filter(stat => (stat.foodDate.getTime() - stat.symptomDate.getTime() < 1000 * 60 * 60 * 72)).length,
    }))


    return (
        <Grid container rowGap={2} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <KPIPanel header />
                <KPIPanel label="< 1 h" header />
                <KPIPanel label="< 24 h" header />
                <KPIPanel label="< 72 h" header />
            </Grid>
            {countByTimeRange.map(range => (
                <Grid container spacing={2}>
                    <KPIPanel
                        label={range.symptomId.toString()}
                        header
                    />
                    <KPIPanel value={range.within1h} />
                    <KPIPanel value={range.within24h} />
                    <KPIPanel value={range.within72h} />
                </Grid>

            ))}
        </Grid>
    )
}

function KPIPanel(props: {
    value?: number
    label?: string
    header?: boolean
}) {
    const elevation = props.header ? 1 : 10

    return (
        <Grid item xs={3}>
            <Paper
                elevation={elevation}
                sx={{ p: 1, textAlign: 'center', minHeight: '50px', alignContent: 'center' }}>
                <Typography>{props.value}</Typography>
                <Typography variant='h5'>{props.label}</Typography>
            </Paper >
        </Grid >
    )
}
