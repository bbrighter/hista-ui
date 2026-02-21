import useHista from "../store"

export const useMedicine = () => {
  return [...useHista(state => state.medicines)].sort((a,b) => a.name.localeCompare(b.name))
}

const useNonArchivedMedicine = () => {
  const medicine = useMedicine()
  return medicine.filter(m => !m.isArchived)
}

export const useIsNameUnique = () => (name: string) => {
  const isUnique =  useHista(state => state.medicines).every(m => m.name.trim() != name.trim())
  const isNonEmpty = name.trim() != "" 
  return isUnique && isNonEmpty
}

export const useTodaysIntakes = () => {
  const intakes = useHista(state => state.intakes)
  const medicines = useNonArchivedMedicine()

  return medicines.map(m => {
    const today = new Date().toDateString()
    const intake = intakes.find(i => m.id == i.medicineId && i.date.toDateString() == today )
    return {
      medicineId: m.id,
      name: m.name,
      count: intake?.count ?? 0,
    }
  })
}

export const useOldIntakes = () => {
  const intakes = useHista(state => state.intakes)
  const medicines = useNonArchivedMedicine()

  const uniqueDates = [...new Set(intakes.map(i => i.date.toDateString()))].filter(d => d != new Date().toDateString())
  return uniqueDates.map(d => (
    { date: new Date(d), 
      values: medicines.map(m => {
        const intake = intakes.find(i => m.id == i.medicineId && i.date.toDateString() == d)
        return {
          medicineId: m.id,
          name: m.name,
          count: intake?.count ?? 0,
        }
      }), 
    }
  ))
}