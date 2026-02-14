import { BarChart } from '@mui/x-charts/BarChart'

import { useBarChartStatistics } from './useGroupedStatistics'

export const IngredientBarChart = ({ severityFilter }: { severityFilter: Array<number> }) => {
    const data = useBarChartStatistics(severityFilter)

    return (
        <BarChart
          height={Math.max(data.length * 60, 100)}
          dataset={data}
          yAxis={[{ dataKey: 'x', tickLabelStyle: { fontSize: 9 } }]}
          xAxis={[{ tickMinStep: 1 }]}
          layout="horizontal"
          series={[
            { dataKey: 'hours1', label: '1 h', stack: 'total', color: 'rgb(180, 0, 0)' },
            { dataKey: 'hours24', label: '24 h', stack: 'total', color: 'rgb(180, 102, 0)' },
            { dataKey: 'hours72', label: '72 h', stack: 'total', color: 'rgb(168, 180, 0)' },
            { dataKey: 'total', label: 'Gesamt', stack: 'total', color: 'rgb(120,120,120)' },
          ]}
        />
    )
}
