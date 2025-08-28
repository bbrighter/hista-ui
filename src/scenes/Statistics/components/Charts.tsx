import Grid from '@mui/material/Grid'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import useHista from '../../../store/store'
import IngredientEvalulation from './Statistics/IngredientEvaluation'
import IngredientSelect from './Statistics/IngredientSelect'
import SeverityFilter from './Statistics/SeverityFilter'
import StatisticsDateInput from './Statistics/StatisticsDateInput'
import SymptomEvaluation from './Statistics/SymptomEvaluation'
import SymptomSelect from './Statistics/SymptomSelect'


export default function Charts(props: {
    type: 'ingredient' | 'symptom'
}) {
    const getStatistics = useHista(state => props.type == 'ingredient' ? state.getSymptomStatistics : state.getFoodStatistics)
    const resetStatistics = useHista(state => state.resetStatistics)

    const today = new Date()
    const [fromDate, setFromDate] = useState(new Date('2024-05-10'))
    const [toDate, setToDate] = useState(today)
    const [ids, setIds] = useState<Array<number>>([])
    const [severity, setSeverity] = useState([1, 5])

    useEffect(() => {
        if (ids.length > 0) {
            getStatistics(fromDate, toDate, ids)
        } else {
            resetStatistics()
        }
    }, [fromDate, getStatistics, ids, resetStatistics, toDate])

    const handleFromDateChange = (value: dayjs.Dayjs | null) => {
        if (value != null) setFromDate(new Date(value.toISOString()))
    }

    const handleToDateChange = (value: dayjs.Dayjs | null) => {
        if (value != null) setToDate(new Date(value.toISOString()))
    }

    const hanldeIdChange = (ids: Array<number>) => {
        setIds(ids)
    }

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSeverity(newValue as number[]);
    }


    return (
        <Grid container sx={{ mt: 2 }}>
            <StatisticsDateInput
                fromDate={fromDate}
                toDate={toDate}
                handleFromDateChange={handleFromDateChange}
                handleToDateChange={handleToDateChange}
            />
            {
                props.type == 'ingredient' &&
                <IngredientChart
                    onIdChange={hanldeIdChange}
                    onSliderChange={handleSliderChange}
                    severity={severity}
                />
            }
            {
                props.type == 'symptom' &&
                <SymptomChart
                    onIdChange={hanldeIdChange}
                />
            }
        </Grid>
    )
}

function IngredientChart(props: {
    onIdChange: (ids: Array<number>) => void
    severity: Array<number>
    onSliderChange: (event: Event, value: number | number[], activeThumb: number) => void
}) {
    return (
        <Grid container size={12}>
            <Grid size={{ xs: 12 }}>
                <IngredientSelect onChange={props.onIdChange} />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <SeverityFilter
                    severity={props.severity}
                    onChange={props.onSliderChange} />
            </Grid>
            <IngredientEvalulation severityFilter={props.severity} />
        </Grid>
    )
}

function SymptomChart(props: {
    onIdChange: (ids: Array<number>) => void
}) {
    return (
        <>
            <Grid size={{ xs: 12 }}>
                <SymptomSelect onChange={props.onIdChange} />
            </Grid>
            <SymptomEvaluation />
        </>)
}