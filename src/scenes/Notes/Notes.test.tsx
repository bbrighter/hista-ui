import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Notes from './Notes'

describe('notes component', () => {
    it('Button exists and works', async () => {
        render(<MemoryRouter><Notes /></MemoryRouter>)

        const button = await screen.findByText('Neue Notiz')
        expect(button).toBeInTheDocument()
        await userEvent.click(button)
        // How to test this?
    })
    it('List is rendered', async () => {
        render(<MemoryRouter><Notes /></MemoryRouter>)

        const existingNotesDate = /31\.01\.2024/
        expect(await screen.findByText(existingNotesDate)).toBeInTheDocument()
    })

    it('Search works', async () => {
        render(<MemoryRouter><Notes /></MemoryRouter>)

        const search = await screen.findByTitle('Suche')
        expect(search).toBeInTheDocument()
        await userEvent.type(search, 'text')
        expect(screen.queryByTitle('Löschen')).toBeInTheDocument()

        await userEvent.type(search, 'blabla')
        expect(screen.queryByTitle('Löschen')).not.toBeInTheDocument()
    })

    it('Deletion works', async () => {
        render(<MemoryRouter><Notes /></MemoryRouter>)

        const deleteButton = await screen.findByTitle('Löschen')
        await userEvent.click(deleteButton)
        expect(screen.queryByTitle('Löschen')).not.toBeInTheDocument()
    })
})