import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import Status from './Status';
import userEvent from '@testing-library/user-event';

describe('Status.tsx', async () => {
    const getStatusCard = (dateString: string): HTMLElement => (screen.getByText(dateString).closest('.MuiPaper-root') as HTMLElement)
    const getEveningPart = (dateString: string): HTMLElement => (within(getStatusCard(dateString)!).getByText('Abends').closest('.MuiGrid-root'))

    it('Renders correctly', async () => {
        render(<Status />)

        await waitFor(() => {
            expect(screen.getByText('+ Status heute')).toBeInTheDocument()
            expect(screen.getByTitle('Status hinzufügen')).toBeInTheDocument()

            const date = '01.01.2024'
            const card = getStatusCard(date)
            expect(card).toBeInTheDocument()
            expect(within(card).getByTitle('Löschen')).toBeInTheDocument()
            const morningPart = within(card).getByText('Morgens').closest('.MuiGrid-root') as HTMLElement
            expect(getComputedStyle(
                within(morningPart).getByTitle('Fitness'))
                .color).toBe('rgb(2, 136, 209)')
            expect(within(morningPart).getAllByRole('slider')).toHaveLength(2)
            expect(getComputedStyle(
                within(morningPart).getByTitle('Schlaf'))
                .color).toBe('rgb(237, 108, 2)')
            const eveningPart = within(card).getByText('Abends').closest('.MuiGrid-root') as HTMLElement
            expect(getComputedStyle(
                within(eveningPart).getByTitle('Fitness'))
                .color).toBe('rgb(211, 47, 47)')
            expect(within(eveningPart).getAllByRole('slider')).toHaveLength(1)
        })
    })

    it('Add a new status', async () => {
        render(<Status />)

        const button = await screen.findByText('+ Status heute')
        await userEvent.click(button)

        expect(screen.getAllByText('Morgens')).toHaveLength(3)
        expect(await screen.findByText('31.03.2024')).toBeInTheDocument()
    })



    it('Edit', async () => {
        render(<Status />)

        let eveningPart: HTMLElement
        await waitFor(() => {
            const date = '01.01.2024'
            eveningPart = getEveningPart(date)
        })

        const slider = within(eveningPart).getByRole('slider')
        fireEvent.change(slider, { target: { value: 5 } })

        await waitFor(() => {
            expect(getComputedStyle(
                within(eveningPart).getByTitle('Fitness'))
                .color).toBe('rgb(46, 125, 50)')
        })
    })

    it('Delete', async () => {
        render(<Status />)

        const date = '01.01.2024'
        let card: HTMLElement
        await waitFor(() => {
            card = getStatusCard(date)
        })

        await userEvent.click(within(card).getByTitle('Löschen'))

        expect(screen.queryByText(date)).toBeNull()
    })
})
