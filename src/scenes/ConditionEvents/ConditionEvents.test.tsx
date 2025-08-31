import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import ConditionEvents from './ConditionEvents';

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

beforeAll(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => { })
})

describe('Manage condition events', () => {
    it('Events are rendered', async () => {
        render(<MemoryRouter><ConditionEvents /></MemoryRouter>)

        const row = await findRowByDate('01.01.2024')
        expect(row).toBeInTheDocument()
    })

    it('Event can be deleted', async () => {
        render(<MemoryRouter><ConditionEvents /></MemoryRouter>)

        const row = await findRowByDate('01.01.2024')
        const deleteButton = within(row).getByTitle('Löschen')
        expect(deleteButton).toBeInTheDocument()

        await userEvent.click(deleteButton)
        expect(screen.queryByText(new RegExp('01.01.2024'))).not.toBeInTheDocument()
    })

    it('Event can be created', async () => {
        render(<MemoryRouter><ConditionEvents /></MemoryRouter>)

        const createButton = await screen.findByText('Neues Symptom')
        expect(createButton).toBeInTheDocument()

        await userEvent.click(createButton)
        expect(mockNavigate).toHaveBeenCalledWith('/condition-events/2')
    })

    it('Event can be opened', async () => {
        render(<MemoryRouter><ConditionEvents /></MemoryRouter>)

        const row = await findRowByDate('01.01.2024')

        await userEvent.click(row)
        expect(mockNavigate).toHaveBeenCalledWith('/condition-events/1')
    })

    it('Symptom management can be opened', async () => {
        render(<MemoryRouter><ConditionEvents /></MemoryRouter>)

        const managementButton = await screen.findByText('Symptome verwalten')
        expect(managementButton).toBeInTheDocument()

        await userEvent.click(managementButton)
        expect(mockNavigate).toHaveBeenCalledWith('/manage-symptoms')
    })
})