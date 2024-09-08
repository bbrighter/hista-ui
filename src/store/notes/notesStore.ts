import { StateCreator } from "zustand"
import { produce } from "immer"
import { SymptomStore } from "../symptom/symptomStore"
import { AuthStore } from "../auth/authStore"
import { ErrorStore } from "../error/errorStore"
import { MealStore } from "../meal/mealStore"
import { Note, respToNote, respToNotes } from "./notes"
import { client } from "../../api/api"
import { api } from "../../api/generatedApi"

interface State {
    notes: Array<Note>
    note: Note
}

interface Actions {
    getNotes: () => Promise<void>,
    postNote: () => Promise<number | undefined>,
    getNote: (id: number) => Promise<void>,
    deleteNote: (id: number) => Promise<void>,
    patchNote: (id: number, date?: string, text?: string) => Promise<void>
}

export interface NotesStore extends State, Actions { }

const initialState: State = {
    notes: [],
    note: { id: 0, date: new Date(), text: "" },
}

export const createNotesSlice: StateCreator<
    AuthStore & ErrorStore & MealStore & SymptomStore & NotesStore,
    [],
    [],
    NotesStore> = ((set, get) => ({
        ...initialState,

        getNotes: async () => {
            try {
                const resp = await client.api.GetNotes()
                set(produce((draft: State) => {
                    draft.notes = respToNotes(resp)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        postNote: async () => {
            try {
                const resp = await client.api.PostNote()
                set(produce((draft: State) => {
                    draft.note = respToNote(resp)
                }))
                return resp.id
            } catch (error) {
                get().setError(error)
            }
        },
        getNote: async (id: number) => {
            try {
                if (get().notes.length == 0) {
                    await get().getNotes()
                }
                const note = get().notes.find(v => v.id == id) || { date: new Date(), id: id, text: "" }
                set(produce((draft: State) => {
                    draft.note = note
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        deleteNote: async (id: number) => {
            try {
                await client.api.DeleteNote(id)
                set(produce((draft: State) => {
                    draft.notes = get().notes.filter(v => v.id != id)
                }))
            } catch (error) {
                get().setError(error)
            }
        },
        patchNote: async (id: number, date?: string, text?: string) => {
            const params: api.NoteParams = {
                date: date,
                text: text,
            }
            try {
                await client.api.PatchNote(id, params)
                set(produce((draft: State) => {
                    if (date) draft.note.date = new Date(date)
                    if (text) draft.note.text = text
                }))
            } catch (error) {
                get().setError(error)
            }
        }
    }))

