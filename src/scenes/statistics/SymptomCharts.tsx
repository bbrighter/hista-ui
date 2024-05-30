import { useEffect, useState } from "react"
import useHista from "../../store/store"
import dayjs from "dayjs"
import SymptomSelect from "./components/SymptomSelect"
import SymptomEvaluation from "./components/SymptomEvaluation"
import { Grid } from "@mui/material"
import StatisticsDateInput from "./components/StatisticsDateInput"


export default function SymptomCharts() {
    const getStatistics = useHista(state => state.getFoodStatistics)
    const resetStatistics = useHista(state => state.resetStatistics)

    const today = new Date()
    const [fromDate, setFromDate] = useState(new Date("2024-05-10"))
    const [toDate, setToDate] = useState(today)
    const [ids, setIds] = useState<Array<number>>([])

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

    const handleSymptomChange = (ids: Array<number>) => {
        setIds(ids)
    }

    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <StatisticsDateInput
                fromDate={fromDate}
                toDate={toDate}
                handleFromDateChange={handleFromDateChange}
                handleToDateChange={handleToDateChange}
            />
            <Grid item xs={12}>
                <SymptomSelect onChange={handleSymptomChange} />
            </Grid>
            <SymptomEvaluation />
        </Grid>
    )
}