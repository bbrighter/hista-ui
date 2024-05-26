import { Grid } from "@mui/material"
import useHista from "../../../store/store"
import { useEffect } from "react"
import KPIPanel from "./KPIPanel"
import { SymptomStatistics } from "../../../store/statistics/statistics"

export default function IngredientEvalulation(props: {
    severityFilter: Array<number>
}) {
    const statistics = useHista(state => state.symptomStatistics)
    const getSymptoms = useHista(state => state.getSymptoms)
    const symptoms = useHista(state => state.symptoms)

    useEffect(() => {
        if (symptoms.length == 0) {
            getSymptoms()
        }
    }, [getSymptoms, symptoms.length])


    const filteredStatistics = statistics.filter(stat => stat.severity >= props.severityFilter[0] && stat.severity <= props.severityFilter[1])

    const groupedStats = Object.values(
        filteredStatistics.reduce((agg: { [index: string]: SymptomStatistics }, stat) => {
            const name = stat.symptomName || ''
            if (agg[name] === undefined) {
                agg[name] = { within1hour: stat.within1hour, within24hours: stat.within24hours, within72hours: stat.within72hours, symptomId: stat.symptomId, severity: stat.severity, symptomName: name }
            }
            agg[name].within1hour += stat.within1hour
            agg[name].within24hours += stat.within24hours
            agg[name].within72hours += stat.within72hours
            return agg
        }, {})
    )

    const maxValue = Math.max(...groupedStats.map(s => s.within72hours))


    return (
        <Grid container rowGap={2} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <KPIPanel header />
                <KPIPanel label="< 1 h" header />
                <KPIPanel label="< 24 h" header />
                <KPIPanel label="< 72 h" header />
            </Grid>
            {groupedStats.map(range => (
                <Grid key={range.symptomId} container spacing={2}>
                    <KPIPanel
                        label={range.symptomName}
                        header
                    />
                    <KPIPanel value={{ current: range.within1hour, max: maxValue }} />
                    <KPIPanel value={{ current: range.within24hours, max: maxValue }} />
                    <KPIPanel value={{ current: range.within72hours, max: maxValue }} />
                </Grid>

            ))}
        </Grid>
    )
}