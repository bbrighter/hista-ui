import { StateCreator } from "zustand"

import { NonFunctionProperties, NotesStore, StoreType } from "../store.type"
import { Note, Notes } from "../types"

type State = NonFunctionProperties<NotesStore>

const initialState = (): State => ({
  notes: {},
  notesAreLoaded: false,
})

export const createNotesSlice: StateCreator<
  StoreType,
  [["zustand/immer", never]],
  [],
  NotesStore> = (set) => ({
  ...initialState(),

  resetNotes: () => {
    set(initialState())
  },

  setNotes: (notes: Notes) => set(state => {
    state.notes = notes
  }),

  addNote: (note: Note) => set(state => {
    state.notes[note.id] = note
  }),

  deleteNote: (id: number) => set(state => {
    delete state.notes[id]
  }),

  updateNote: (id: number, part: Partial<Note>) => set(state => {
    const note = state.notes[id]
    if (!note) return

    state.notes[id] = { ...note, ...part }
  }),

  setNotesAreLoaded: (loaded: boolean) => set(state => {
    state.notesAreLoaded = loaded
  }),
})
