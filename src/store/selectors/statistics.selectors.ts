import useHista from '../store'

export const useSymptomStatisticsWithNames = () => {
  const statistics = useHista(state => state.statistics)
  const symptoms = useHista(state => state.symptoms)

  const symptomMap = new Map(symptoms.flatMap(cat => cat.symptoms.map(s => [s.id, s.name])))

  return statistics.map(st => ({
    ...st,
    symptomName: symptomMap.get(st.symptomId),
  }))
}
