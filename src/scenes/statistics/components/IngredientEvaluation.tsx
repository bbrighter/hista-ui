import { Grid } from "@mui/material"
import useHista from "../../../store/store"
import { useEffect } from "react"
import KPIPanel from "./KPIPanel"
import { SymptomStatistics } from "../../../store/statistics/statistics"

export default function IngredientEvalulation(props: {
    severityFilter: Array<number>
    relative: boolean
}) {
    const statistics = useHista(state => state.symptomStatistics)
    const getSymptoms = useHista(state => state.getSymptoms)

    useEffect(() => {
        getSymptoms()
    }, [getSymptoms])


    const filteredStatistics = statistics.filter(stat => stat.severity >= props.severityFilter[0] && stat.severity <= props.severityFilter[1])

    const groupedStats = (data: SymptomStatistics[]): SymptomStatistics[] => {
        type Result = {
            [key: number]: SymptomStatistics
        }
        const result: Result = {}

        data.forEach((item) => {
            const { symptomId, within1hour, within24hours, within72hours, symptomName, severity, count } = item
            if (!result[symptomId]) {
                result[symptomId] = {
                    symptomId: symptomId,
                    symptomName: symptomName,
                    severity: severity,
                    count: 0,
                    within1hour: 0,
                    within24hours: 0,
                    within72hours: 0
                }
            }
            result[symptomId].within1hour += within1hour
            result[symptomId].within24hours += within24hours
            result[symptomId].within72hours += within72hours
            result[symptomId].count = count

        })
        return Object.values(result)
    }

    const groupedStatistics = groupedStats(filteredStatistics).map(v => ({
        count: v.count,
        within1hour: props.relative ? v.within1hour / v.count : v.within1hour,
        within24hours: props.relative ? v.within24hours / v.count : v.within24hours,
        within72hours: props.relative ? v.within72hours / v.count : v.within72hours,
        symptomId: v.symptomId,
        symptomName: v.symptomName,
    }))

    groupedStatistics.sort((a, b) =>
        b.within72hours - a.within72hours == 0 ?
            b.within24hours - a.within24hours == 0 ?
                b.within1hour - a.within1hour :
                b.within24hours - a.within24hours :
            b.within72hours - a.within72hours)

    const maxValue = props.relative ? 1 : Math.max(...groupedStatistics.map(s => s.within72hours))

    return (
        <Grid container rowGap={1} sx={{ mt: 2 }}>
            <Grid container spacing={1}>
                <KPIPanel header />
                <KPIPanel label="< 1 h" header />
                <KPIPanel label="< 24 h" header />
                <KPIPanel label="< 72 h" header />
            </Grid>
            {groupedStatistics.map(range => {
                const count = props.relative ? range.count : undefined
                return (
                    <Grid key={range.symptomId} container spacing={1}>
                        <KPIPanel
                            label={range.symptomName}
                            subLine={count}
                            header
                        />
                        <KPIPanel value={{ current: range.within1hour, max: maxValue }} showPercent={props.relative} />
                        <KPIPanel value={{ current: range.within24hours, max: maxValue }} showPercent={props.relative} />
                        <KPIPanel value={{ current: range.within72hours, max: maxValue }} showPercent={props.relative} />
                    </Grid>

                )
            }
            )}
        </Grid>
    )
}