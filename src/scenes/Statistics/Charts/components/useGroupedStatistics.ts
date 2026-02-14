import { useMemo } from 'react'

import { useSymptomStatisticsWithNames } from '../../../../store'
import useHista from '../../../../store/store'

const useGroupedStatistics = (severityFilter: Array<number>) => {
  const statistics = useSymptomStatisticsWithNames()

  type Stats = typeof statistics
  type Stat = Stats[number]

  const result: Record<number, Stat> = {}

  for (const stat of statistics) {
    if (stat.severity < severityFilter[0] || stat.severity > severityFilter[1]) continue

    const symptomId = stat.symptomId
    if (!result[symptomId]) {
      result[symptomId] = {
        ...stat,
        within1hour: 0,
        within24hours: 0,
        within72hours: 0,
      }
    }
    result[symptomId].within1hour += stat.within1hour
    result[symptomId].within24hours += stat.within24hours
    result[symptomId].within72hours += stat.within72hours
  }
  return Object.values(result)
}

export const useBarChartStatistics = (severityFilter: Array<number>) => {
  const statistics = useGroupedStatistics(severityFilter)
  const mealCount = useHista(state => state.mealCount)

  return useMemo(() => statistics.map(s => ({
    x: s.symptomName,
    total: mealCount - s.within72hours - s.within24hours - s.within1hour,
    hours72: s.within72hours,
    hours24: s.within24hours,
    hours1: s.within1hour,
  })), [statistics])
}
