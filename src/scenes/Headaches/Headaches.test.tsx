import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import Headaches from './Headaches'

const findRowByDate = async (date: string): Promise<HTMLElement> => {
    return (await screen.findByText(new RegExp(date))).closest('li')
}

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('Headache management', () => {
    it('Headaches and colors are rendered', async () => {
        render(<MemoryRouter><Headaches /></MemoryRouter>)

        const row = await findRowByDate('01.01.2022')
        expect(row).toBeInTheDocument()
        const severityCircle = within(row).getByTitle('Schwere')
        expect(severityCircle).toBeInTheDocument()
        expect(within(row).getByTestId('circle-icon')).toHaveStyle({ color: 'rgb(153,255,0)' })
    })

    it('Headache can be deleted', async () => {
        render(<MemoryRouter><Headaches /></MemoryRouter>)

        const row = await findRowByDate('01.01.2022')
        const deleteButton = within(row).getByTitle('Löschen')
        expect(deleteButton).toBeInTheDocument()

        await userEvent.click(deleteButton)
        expect(screen.queryByText(new RegExp('01.01.2022'))).not.toBeInTheDocument()
    })

    it('Headache can be created', async () => {
        render(<MemoryRouter><Headaches /></MemoryRouter>)

        const createButton = await screen.findByText('Neuer Kopfschmerz')
        expect(createButton).toBeInTheDocument()

        await userEvent.click(createButton)

        expect(mockNavigate).toHaveBeenCalledWith('2')
    })

    it('Clicking a row opens the headache', async () => {
        render(<MemoryRouter><Headaches /></MemoryRouter>)

        const row = await findRowByDate('01.01.2022')
        await userEvent.click(row)

        expect(mockNavigate).toHaveBeenCalledWith('1')
    })
})
