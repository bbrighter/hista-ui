import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'

import { statisticsService } from '../../../../../store'
import useHista from '../../../../../store/store'
import { IngredientBarChart } from './IngredientBarChart'
import IngredientSelect from './IngredientSelect'
import SeverityFilter from './SeverityFilter'

export const IngredientChart = ({
    from, to,
}: {
    from: Date
    to: Date
}) => {
    const [id, setId] = useState<number>(0)
    const [severity, setSeverity] = useState([1, 5])
    const getSymptoms = useHista(state => state.getSymptoms)
    const resetStatistics = useHista(state => state.resetStatistics)
    useEffect(() => {
        getSymptoms()
    })

    useEffect(() => {
        if (id == 0) {
            resetStatistics()
        }
        else {
        statisticsService.getMealStatistics(from, to, id)
}
    }, [from, to, id])

    const hanldeIdChange = (id: number) => {
        setId(id)
    }

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSeverity(newValue as number[])
    }

    return (
        <Grid container size={12}>
            <Grid size={{ xs: 12 }}>
                <IngredientSelect onChange={hanldeIdChange} />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <SeverityFilter
                  severity={severity}
                  onChange={handleSliderChange}
                />
            </Grid>
            <IngredientBarChart severityFilter={severity} />
        </Grid>
    )
}
