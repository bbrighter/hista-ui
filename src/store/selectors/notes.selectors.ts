import useHista from "../store"

export const useNote = (id: number) => {
  const notes = useHista(state => state.notes)
  return notes[id] ?? { id, date: new Date(), text: "" }
}

export const useNotes = () => {
  const notes = useHista(state => state.notes)
  return Object.values(notes).sort((a,b) => b.date.getTime() - a.date.getTime())
}