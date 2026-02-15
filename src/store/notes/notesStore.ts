import { produce } from "immer"
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
  [],
  [],
  NotesStore> = (set, get) => ({
  ...initialState,

  getNotes: async () => {
    const resp = await client.ListNotes()
    set(produce((draft: State) => {
      draft.notes = respToNotes(resp)
    }))
  },
  postNote: async () => {
    const resp = await client.PostNote()
    set(produce((draft: State) => {
      draft.note = respToNote(resp)
      draft.notes.push(draft.note)
    }))
    return resp.id
  },
  getNote: async (id: number) => {
    if (get().notes.length == 0) {
      await get().getNotes()
    }
    const note = get().notes.find(v => v.id == id) || { date: new Date(), id: id, text: "" }
    set(produce((draft: State) => {
      draft.note = note
    }))
  },
  deleteNote: async (id: number) => {
    await client.DeleteNote(id)
    set(produce((draft: State) => {
      draft.notes = get().notes.filter(v => v.id != id)
    }))
  },
  patchNote: async (id: number, date?: string, text?: string) => {
    const params: hista.NoteParams = {
      date: date,
      text: text,
    }
    const noteIndex = get().notes.findIndex(v => v.id == id)
    await client.PatchNote(id, params)
    set(produce((draft: State) => {
      if (date) {
        draft.note.date = new Date(date)
        draft.notes[noteIndex].date = new Date(date)
      }
      if (text) {
        draft.note.text = text
        draft.notes[noteIndex].text = text
      }
    }))
  },
})
