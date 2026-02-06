import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Status from './Status'

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
            expect(within(morningPart).getByRole('img', { name: 'Fitness' })).toBeInTheDocument()
            expect(within(morningPart).getByRole('img', { name: 'Fitness' })).toHaveStyle({ color: 'rgb(255,255,0)' })
            expect(within(morningPart).getAllByRole('slider')).toHaveLength(2)
            expect(within(morningPart).getByRole('img', { name: 'Schlaf' })).toHaveStyle({ color: 'rgb(255,128,0)' })
            const eveningPart = within(card).getByText('Abends').closest('.MuiGrid-root') as HTMLElement
            expect(within(eveningPart).getByRole('img', { name: 'Fitness' })).toHaveStyle({ color: 'rgb(255,0,0)' })
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
        expect(slider).toHaveStyle({ color: 'rgb(255,0,0)' })
        fireEvent.change(slider, { target: { value: 5 } })

        const fetchSpy = vi.spyOn(global, 'fetch')
        expect(fetchSpy).not.toHaveBeenCalled()

        await waitFor(() => {
            expect(within(eveningPart).getByRole('img', { name: 'Fitness' })).toHaveStyle({ color: 'rgb(0,131,0)' })
            expect(fetchSpy).toHaveBeenCalled()
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
