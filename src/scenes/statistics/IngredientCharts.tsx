import { useEffect, useState } from "react"
import useHista from "../../store/store"
import dayjs from "dayjs"
import { Grid } from "@mui/material"
import IngredientSelect from "./components/IngredientSelect"
import IngredientEvalulation from "./components/IngredientEvaluation"
import SeverityFilter from "./components/SeverityFilter"
import StatisticsDateInput from "./components/StatisticsDateInput"


export default function IngredientCharts() {
    const getStatistics = useHista(state => state.getSymptomStatistics)
    const resetStatistics = useHista(state => state.resetStatistics)

    const today = new Date()
    const [fromDate, setFromDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7))
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

    const handleIdChange = (ids: Array<number>) => {
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
            <Grid item xs={12}>
                <IngredientSelect onChange={handleIdChange} />
            </Grid>
            <Grid item xs={12}>
                <SeverityFilter
                    severity={severity}
                    onChange={handleSliderChange} />
            </Grid>
            <IngredientEvalulation severityFilter={severity} />
        </Grid>
    )
}