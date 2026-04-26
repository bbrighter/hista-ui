import { hista } from "../../api/generatedApi"

export type Note = {
  id: number
  date: Date
  text: string
}

export type Notes = Record<number, Note>

export const respToNotes = (resp: hista.NoteListResponse): Notes => {
  return Object.fromEntries(resp.notes.map(n => {
    const note = respToNote(n)
    return [note.id, note]
  }))
}

export const respToNote = (resp: hista.NoteResponse): Note => {
  return (
    {
      id: resp.id,
      date: new Date(resp.date),
      text: resp.text,
    })
}
