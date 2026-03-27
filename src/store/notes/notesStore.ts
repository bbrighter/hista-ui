import { StateCreator } from "zustand"

import { client } from "../../api/api"
import { hista } from "../../api/generatedApi"
import { Note, respToNote, respToNotes } from "./notes"

interface State {
  notes: Array<Note>
  note: Note
}

interface Actions {
  getNotes: () => Promise<void>
  postNote: () => Promise<number | undefined>
  getNote: (id: number) => Promise<void>
  deleteNote: (id: number) => Promise<void>
  patchNote: (id: number, date?: string, text?: string) => Promise<void>
}

export interface NotesStore extends State, Actions { }

const initialState: State = {
  notes: [],
  note: { id: 0, date: new Date(), text: "" },
}

export const createNotesSlice: StateCreator<
  NotesStore,
  [["zustand/immer", never]],
  [],
  NotesStore> = (set, get) => ({
  ...initialState,

  getNotes: async () => {
    const resp = await client.ListNotes()
    set(state => {
      state.notes = respToNotes(resp)
    })
  },
  postNote: async () => {
    const resp = await client.PostNote()
    set(state => {
      state.note = respToNote(resp)
      state.notes.push(state.note)
    })
    return resp.id
  },
  getNote: async (id: number) => {
    if (get().notes.length == 0) {
      await get().getNotes()
    }
    const note = get().notes.find(v => v.id == id) || { date: new Date(), id: id, text: "" }
    set(state => {
      state.note = note
    })
  },
  deleteNote: async (id: number) => {
    await client.DeleteNote(id)
    set(state => {
      state.notes = get().notes.filter(v => v.id != id)
    })
  },
  patchNote: async (id: number, date?: string, text?: string) => {
    const params: hista.NoteParams = {
      date: date,
      text: text,
    }
    const noteIndex = get().notes.findIndex(v => v.id == id)
    await client.PatchNote(id, params)
    set(state => {
      if (date) {
        state.note.date = new Date(date)
        state.notes[noteIndex].date = new Date(date)
      }
      if (text) {
        state.note.text = text
        state.notes[noteIndex].text = text
      }
    })
  },
})
