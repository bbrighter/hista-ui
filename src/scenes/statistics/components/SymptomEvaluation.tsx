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


    const maxValue = Math.max(...statistics.map(s => s.within72hours))

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
                    <KPIPanel value={{ current: range.within1hour, max: maxValue }} />
                    <KPIPanel value={{ current: range.within24hours, max: maxValue }} />
                    <KPIPanel value={{ current: range.within72hours, max: maxValue }} />
                </Grid>

            ))}
        </Grid>
    )
}

function KPIPanel(props: {
    value?: { current: number, max: number }
    label?: string
    subLine?: string
    header?: boolean
}) {
    const elevation = props.header ? 1 : 10

    let backgroundColor: string | undefined = undefined
    let textcolor: string | undefined = undefined
    if (props.value != undefined) {
        const currentValue = props.value.current
        const maxValue = props.value.max
        const step = maxValue / 5

        if (currentValue == 0) {
            backgroundColor = undefined
        } else if (currentValue < step) {
            backgroundColor = '#007f4e'
            textcolor = 'black'
        } else if (currentValue < step * 2) {
            backgroundColor = '#72b043'
            textcolor = 'black'
        } else if (currentValue < step * 3) {
            backgroundColor = '#f8cc1b'
            textcolor = 'black'
        } else if (currentValue < step * 4) {
            backgroundColor = '#f37324'
            textcolor = 'black'
        } else {
            backgroundColor = '#e12729'
            textcolor = 'black'
        }
    }


    return (
        <Grid item xs={3}>
            <Paper
                elevation={elevation}
                sx={{ p: 0, textAlign: 'center', minHeight: '70px', alignContent: 'center', backgroundColor: backgroundColor }}
            >
                <Typography color={textcolor}>{props.value?.current}</Typography>
                <Typography variant='h6'>{props.label}</Typography>
                <Typography variant="caption">{props.subLine}</Typography>
            </Paper >
        </Grid >
    )
}