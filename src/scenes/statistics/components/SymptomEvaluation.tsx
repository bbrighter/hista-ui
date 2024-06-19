import { Box } from "@mui/material"
import useHista from "../../../store/store"
import { useEffect } from "react"
import KPIGrid, { KPIGridValues } from "./KPIPanel"

export default function SymptomEvaluation() {
    const statistics = useHista(state => state.foodStatistics)
    const getIngredients = useHista(state => state.getIngredients)
    const ingredients = useHista(state => state.ingredients)

    useEffect(() => {
        if (ingredients.length == 0) {
            getIngredients()
        }
    }, [getIngredients, ingredients.length])

    const values: KPIGridValues = statistics.map(s => (
        {
            entries: [s.within1hour, s.within24hours, s.within72hours],
            label: s.ingredientName || "",
            subline: s.foodCondition + ' - ' + s.count.toString(),
            count: s.count,
        }
    ))

    return (
        <Box sx={{ mt: 2, width: '100%' }}>
            <KPIGrid
                headers={["< 1h", "< 24h", "< 72h"]}
                values={values}
            />
        </Box>
    )
}