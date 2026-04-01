import { client } from "../../api/api"
import useHista from "../store"
import { respToNote, respToNotes } from "../types"

export const notes = {
  list: async () => {
    const { notesAreLoaded, setNotes,setNotesAreLoaded } = useHista.getState()
    if (notesAreLoaded) return

    const resp = await client.ListNotes()
    setNotes(respToNotes(resp))
    setNotesAreLoaded(true)
  },

  post: async () => {
    const { addNote } = useHista.getState()

    const resp = await client.PostNote()
    addNote(respToNote(resp))
    return resp.id
  },

  patchText: async (id: number, text: string) => {
    const { updateNote } = useHista.getState()

    await client.PatchNote(id, { text: text })
    updateNote(id, { text: text })

  },

  patchDate: async (id: number, date: Date) => {
    const { updateNote } = useHista.getState()

    await client.PatchNote(id, { date: date.toISOString() })
    updateNote(id, { date: date })
  },

  delete: async (id: number) => {
    const { deleteNote } = useHista.getState()

    await client.DeleteNote(id)
    deleteNote(id)
  },
}