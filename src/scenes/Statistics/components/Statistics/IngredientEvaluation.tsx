import Box from '@mui/material/Box'
import { useEffect } from 'react'

import { SymptomStatistics } from '../../../../store/statistics/statistics'
import useHista from '../../../../store/store'
import KPIGrid, { KPIGridValues } from './KPIPanel'

export default function IngredientEvalulation(props: {
    severityFilter: Array<number>
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
                    within72hours: 0,
                }
            }
            result[symptomId].within1hour += within1hour
            result[symptomId].within24hours += within24hours
            result[symptomId].within72hours += within72hours
            result[symptomId].count = count
        })
        return Object.values(result)
    }

    const groupedStatistics = groupedStats(filteredStatistics)

    const values: KPIGridValues = groupedStatistics.map(s => (
        {
            label: s.symptomName || '',
            subline: s.count.toString(),
            entries: [s.within1hour, s.within24hours, s.within72hours],
            count: s.count,
        }
    ))

    return (
        <Box sx={{ mt: 2, width: '100%' }}>
            <KPIGrid
              headers={['< 1h', '< 24h', '< 72h']}
              values={values}
            />
        </Box>
    )
}
