import { Grid, Paper, Typography } from "@mui/material"
import useHista from "../../../store/store"
import { useEffect } from "react"

export default function SymptomEvaluation() {
    const statistics = useHista(state => state.statistics)
    const getIngredients = useHista(state => state.getIngredients)
    const ingredients = useHista(state => state.ingredients)

    useEffect(() => {
        if (ingredients.length == 0) {
            getIngredients()
        }
    }, [getIngredients, ingredients.length])

    return (
        <Grid container rowGap={2} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <KPIPanel header />
                <KPIPanel label="< 1 h" header />
                <KPIPanel label="< 24 h" header />
                <KPIPanel label="< 72 h" header />
            </Grid>
            {statistics.map(range => (
                <Grid key={range.ingredientId} container spacing={2}>
                    <KPIPanel
                        label={range.ingredientName}
                        header
                        subLine={range.foodCondition}
                    />
                    <KPIPanel value={range.within1hour} />
                    <KPIPanel value={range.within24hours} />
                    <KPIPanel value={range.within72hours} />
                </Grid>

            ))}
        </Grid>
    )
}

function KPIPanel(props: {
    value?: number
    label?: string
    subLine?: string
    header?: boolean
}) {
    const elevation = props.header ? 1 : 10

    return (
        <Grid item xs={3}>
            <Paper
                elevation={elevation}
                sx={{ p: 1, textAlign: 'center', minHeight: '70px', alignContent: 'center' }}>
                <Typography>{props.value}</Typography>
                <Typography variant='h6'>{props.label}</Typography>
                <Typography variant="caption">{props.subLine}</Typography>
            </Paper >
        </Grid >
    )
}
