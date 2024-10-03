import { entity } from '../../api/generatedApi'

export interface Note {
    id: number
    date: Date
    text: string
}

export const respToNotes = (resp: entity.NotesResp): Array<Note> => {
    return resp.notes.map(note => respToNote(note))
}

export const respToNote = (resp: entity.NoteResp): Note => {
    return (
        {
            id: resp.id,
            date: new Date(resp.date),
            text: resp.text,
        })
}