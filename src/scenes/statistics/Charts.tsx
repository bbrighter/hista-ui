import { useEffect, useState } from "react"
import useHista from "../../store/store"
import dayjs from "dayjs"
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material"
import SymptomSelect from "./components/SymptomSelect"
import SymptomEvaluation from "./components/SymptomEvaluation"
import StatisticsDateInput from "./components/StatisticsDateInput"
import IngredientEvalulation from "./components/IngredientEvaluation"
import SeverityFilter from "./components/SeverityFilter"
import IngredientSelect from "./components/IngredientSelect"

type ToggleValue = 'relative' | 'absolute'

export default function Charts(props: {
    type: 'ingredient' | 'symptom'
}) {
    const getStatistics = useHista(state => props.type == 'ingredient' ? state.getSymptomStatistics : state.getFoodStatistics)
    const resetStatistics = useHista(state => state.resetStatistics)

    const today = new Date()
    const [fromDate, setFromDate] = useState(new Date("2024-05-10"))
    const [toDate, setToDate] = useState(today)
    const [ids, setIds] = useState<Array<number>>([])
    const [severity, setSeverity] = useState([1, 5])
    const [showRelative, setShowRelative] = useState<ToggleValue>('relative')

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

    const handleToggleChange = (_: React.MouseEvent, value: ToggleValue) => {
        setShowRelative(value)
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
                    showRelative={showRelative}
                    onToggleChange={handleToggleChange}
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
    showRelative: ToggleValue
    onToggleChange: (event: React.MouseEvent, value: ToggleValue) => void
}) {
    return (
        <>
            <Grid item xs={12}>
                <IngredientSelect onChange={props.onIdChange} />
            </Grid>
            <Grid item xs={12}>
                <SeverityFilter
                    severity={props.severity}
                    onChange={props.onSliderChange} />
            </Grid>
            <Grid item xs={12}>
                <ToggleButtonGroup
                    value={props.showRelative}
                    onChange={props.onToggleChange}
                    exclusive
                >
                    <ToggleButton value={'relative'}>Relativ</ToggleButton>
                    <ToggleButton value={'absolute'}>Absolut</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <IngredientEvalulation severityFilter={props.severity} relative={props.showRelative == 'relative'} />
        </>
    )
}

function SymptomChart(props: {
    onIdChange: (ids: Array<number>) => void
}) {
    return (
        <>
            <Grid item xs={12}>
                <SymptomSelect onChange={props.onIdChange} />
            </Grid>
            <SymptomEvaluation />
        </>)
}