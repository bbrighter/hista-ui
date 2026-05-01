import { client } from "../api/api"
import { respToNote, respToNotes } from "../store"
import useHista from "../store/store"

export const notes = {
  list: async () => {
    const { loaded, setNotes, setLoaded } = useHista.getState()
    if (loaded["notes"]) return

    const resp = await client.ListNotes()
    setNotes(respToNotes(resp))
    setLoaded("notes")
  },

  post: async () => {
    const { addNote } = useHista.getState()

    const resp = await client.PostNote()
    addNote(resp.id, respToNote(resp))
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
    const { removeNote } = useHista.getState()

    await client.DeleteNote(id)
    removeNote(id)
  },
}