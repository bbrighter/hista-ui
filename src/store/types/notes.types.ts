import { entity } from "../../api/generatedApi"

export type Note = {
  id: number
  date: Date
  text: string
}

export type Notes = Record<number, Note>

export const respToNotes = (resp: entity.NotesResp): Notes => {
  return Object.fromEntries(resp.notes.map(n => {
    const note = respToNote(n)
    return [note.id, note]
  }))
}

export const respToNote = (resp: entity.NoteResp): Note => {
  return (
    {
      id: resp.id,
      date: new Date(resp.date),
      text: resp.text,
    })
}
