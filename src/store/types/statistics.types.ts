import { entity } from '../../api/generatedApi'

export type SymptomStatistics = Array<
  {
    symptomId: number
    severity: number
    within1hour: number
    within24hours: number
    within72hours: number
  }>

export const respToSymptomStatistics = (
  resp: entity.SymptomStatisticsResponse,
): SymptomStatistics => (
  resp.statistics.map(r => (
    {
      severity: r.severity,
      symptomId: r.symptomId,
      within1hour: r.hours1,
      within24hours: r.hours24,
      within72hours: r.hours72,
    })).sort(
    (a, b) => (b.within72hours - a.within72hours),
  )
)
