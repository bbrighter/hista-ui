import { beforeEach, describe, expect, it } from 'vitest'

import useHista from '../store'

describe('notesStore', () => {

    beforeEach(async () => {
        await useHista.getState().getNotes()
    })

    it('getNotes', async () => {
        const notes = useHista.getState().notes
        expect(notes).toHaveLength(1)
        expect(notes[0].id).toStrictEqual(1)
        expect(notes[0].text).toStrictEqual('text')
        expect(notes[0].date).toStrictEqual(new Date('2024-01-31T12:00:00Z'))
    })

    it('postNote', async () => {
        await useHista.getState().postNote()

        expect(useHista.getState().notes).toHaveLength(2)
        const note = useHista.getState().note
        expect(note.id).toStrictEqual(2)
        expect(note.text).toStrictEqual('text new')
        expect(note.date).toStrictEqual(new Date('2025-01-31T12:00:00Z'))
    })


    it('deleteNote', async () => {
        await useHista.getState().deleteNote(1)
        expect(useHista.getState().notes).toHaveLength(0)
    })


    it('patchNote', async () => {
        await useHista.getState().patchNote(1, '2022-01-01T00:00:00Z', 'changedText')
        await useHista.getState().getNote(1)
        const note = useHista.getState().note

        expect(note.text).toBe('changedText')
        expect(note.date).toStrictEqual(new Date('2022-01-01T00:00:00Z'))
    })

    it('patch note, only text', async () => {
        await useHista.getState().patchNote(1, undefined, 'changedText')
        await useHista.getState().getNote(1)
        const note = useHista.getState().note

        expect(note.text).toBe('changedText')
        expect(note.date).toStrictEqual(new Date('2024-01-31T12:00:00Z'))
    })

    it('patch note, only date', async () => {
        await useHista.getState().patchNote(1, '2022-01-01T00:00:00Z', undefined)
        await useHista.getState().getNote(1)
        const note = useHista.getState().note

        expect(note.text).toBe('text')
        expect(note.date).toStrictEqual(new Date('2022-01-01T00:00:00Z'))
    })
})