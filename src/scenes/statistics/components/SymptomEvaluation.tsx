import { Grid } from "@mui/material"
import useHista from "../../../store/store"
import { useEffect } from "react"
import KPIPanel from "./KPIPanel"

export default function SymptomEvaluation() {
    const statistics = useHista(state => state.foodStatistics)
    const getIngredients = useHista(state => state.getIngredients)
    const ingredients = useHista(state => state.ingredients)

    useEffect(() => {
        if (ingredients.length == 0) {
            getIngredients()
        }
    }, [getIngredients, ingredients.length])


    const maxValue = Math.max(...statistics.map(s => s.within72hours))

    return (
        <Grid container rowGap={1} sx={{ mt: 2 }}>
            <Grid container spacing={1}>
                <KPIPanel header />
                <KPIPanel label="< 1 h" header />
                <KPIPanel label="< 24 h" header />
                <KPIPanel label="< 72 h" header />
            </Grid>
            {statistics.map(range => (
                <Grid key={range.ingredientId + "_" + range.foodCondition} container spacing={1}>
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