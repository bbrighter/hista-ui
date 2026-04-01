import { StateCreator } from "zustand"

import { Note, Notes } from "../types"

interface State {
  notes: Notes
  notesAreLoaded: boolean
}

interface Actions {
  resetNotes: () => void

  setNotes: (notes: Notes) => void
  updateNote: (id: number, part: Partial<Note>) => void
  deleteNote: (id: number) => void
  addNote: (note: Note) => void

  setNotesAreLoaded: (loaded: boolean) => void
}

export interface NotesStore extends State, Actions { }

const initialState = (): State => ({
  notes: {},
  notesAreLoaded: false,
})

export const createNotesSlice: StateCreator<
  NotesStore,
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
