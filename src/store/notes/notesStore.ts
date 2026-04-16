import { StateCreator } from "zustand"

import { NonFunctionProperties, NotesStore, StoreType } from "../store.type"
import { Note, Notes } from "../types"

type State = NonFunctionProperties<NotesStore>

const initialState = (): State => ({
  notes: {},
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

  addNote: (id: number, note: Note) => set(state => {
    state.notes[id] = note
  }),

  removeNote: (id: number) => set(state => {
    delete state.notes[id]
  }),

  updateNote: (id: number, part: Partial<Note>) => set(state => {
    const note = state.notes[id]
    if (!note) return

    state.notes[id] = { ...note, ...part }
  }),
})
