import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestStore } from '../../__tests__/storeUtils'
import { mockClient } from '../../__tests__/__mocks__/apiMocks'
import { entity } from '../../api/generatedApi'
import { Note } from './notes'

describe('notesStore', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })

    it('getNotes', async () => {
        const mockResp: entity.NotesResp = {
            notes: [{ id: 1, text: 'text', date: '2024-01-01T00:00:00Z' }],
        }
        mockClient.api.GetNotes.mockResolvedValue(mockResp)

        await store.getState().getNotes()
        expect(store.getState().notes).toHaveLength(1)
        expect(store.getState().notes[0].id).toStrictEqual(1)
        expect(store.getState().notes[0].text).toStrictEqual('text')
        expect(store.getState().notes[0].date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('postNote', async () => {
        const mockResp: entity.NoteResp = {
            id: 1,
            text: 'text',
            date: '2024-01-01T00:00:00Z',
        }
        mockClient.api.PostNote.mockResolvedValue(mockResp)

        await store.getState().postNote()
        expect(store.getState().notes).toHaveLength(1)
        const note = store.getState().note
        expect(note.id).toStrictEqual(1)
        expect(note.text).toStrictEqual('text')
        expect(note.date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('getNote if already loaded', async () => {
        store.setState({ ...store.getState(), notes: [{ id: 1, text: 'text', date: new Date() }] })

        await store.getState().getNote(1)
        expect(mockClient.api.GetNotes).not.toHaveBeenCalled()
        expect(store.getState().note.id).toStrictEqual(1)
    })

    it('getNote if none are loaded', async () => {
        const mockResp: entity.NotesResp = {
            notes: [{ id: 1, text: 'text', date: '2024-01-01T00:00:00Z' }],
        }
        mockClient.api.GetNotes.mockResolvedValue(mockResp)

        await store.getState().getNote(1)
        expect(mockClient.api.GetNotes).toHaveBeenCalled()
        expect(store.getState().note.id).toStrictEqual(1)
    })

    it('deleteNote', async () => {
        const existingNotes: Array<Note> = [
            { id: 1, text: 'text1', date: new Date() },
            { id: 2, text: 'text2', date: new Date() },
        ]
        store.setState({ ...store.getState(), notes: existingNotes })
        mockClient.api.DeleteNote.mockResolvedValue(undefined)

        await store.getState().deleteNote(1)
        expect(store.getState().notes).toHaveLength(1)
        expect(store.getState().notes[0].id).toStrictEqual(2)
    })

    it('deleteNote with error', async () => {
        const existingNotes: Array<Note> = [
            { id: 1, text: 'text1', date: new Date() },
            { id: 2, text: 'text2', date: new Date() },
        ]
        store.setState({ ...store.getState(), notes: existingNotes })
        mockClient.api.DeleteNote.mockRejectedValue(undefined)

        await store.getState().deleteNote(10)

        expect(store.getState().notes).toHaveLength(2)
        expect(mockClient.api.DeleteNote).toHaveBeenCalled()
    })

    it('patchNote', async () => {
        const existingNote: Note = { id: 1, text: 'text1', date: new Date() }
        const existingNotes: Array<Note> = [existingNote]

        store.setState({ ...store.getState(), note: existingNote, notes: existingNotes })
        mockClient.api.PatchNote.mockResolvedValue(undefined)

        await store.getState().patchNote(1, '2024-01-01T00:00:00Z')
        expect(store.getState().note.date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
        expect(store.getState().note.text).toStrictEqual('text1')
        expect(store.getState().notes[0].date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))

        await store.getState().patchNote(1, undefined, 'text2')
        expect(store.getState().note.text).toStrictEqual('text2')
        expect(store.getState().notes[0].text).toStrictEqual('text2')

        await store.getState().patchNote(1, '2024-02-02T00:00:00Z', 'text3')
        expect(store.getState().note.date).toStrictEqual(new Date('2024-02-02T00:00:00Z'))
        expect(store.getState().note.text).toStrictEqual('text3')
    })
})