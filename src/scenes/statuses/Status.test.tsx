import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import Status from './Status';
import userEvent from '@testing-library/user-event';

describe.skip('Status.tsx', async () => {

    const getStatusCard = (dateString: string): HTMLElement => (screen.getByText(dateString).closest('.MuiPaper-root') as HTMLElement)
    const getDeleteButton = (dateString: string): HTMLElement => (within(getStatusCard(dateString)!).getByTitle('Löschen'))
    const getMorningPart = (dateString: string): HTMLElement => (within(getStatusCard(dateString)!).getByTitle('Morgens').closest('.MuiGrid-root'))
    const getEveningPart = (dateString: string): HTMLElement => (within(getStatusCard(dateString)!).getByTitle('Abends').closest('.MuiGrid-root'))
    const morningFitness = (dateString: string): HTMLElement => (within(getMorningPart(dateString)!).getByTitle('Fitness'))
    const morningSleep = (dateString: string): HTMLElement => (within(getMorningPart(dateString)!).getByTitle('Schlaf'))
    const eveningFitness = (dateString: string): HTMLElement => (within(getEveningPart(dateString)!).getByTitle('Fitness'))

    it('Renders correctly', async () => {
        render(<Status />)

        await waitFor(() => {
            expect(screen.getByText('+ Status heute')).toBeInTheDocument()
            expect(screen.getByTitle('Status hinzufügen')).toBeInTheDocument()

            const date = '01.01.2024'
            expect(getStatusCard(date)).toBeInTheDocument()
            expect(getDeleteButton(date)).toBeInTheDocument()
            expect(getMorningPart(date)).toBeInTheDocument()
            expect(getEveningPart(date)).toBeInTheDocument()
            expect(morningFitness(date)).toBeInTheDocument()
            expect(getComputedStyle(morningFitness(date)).color).toBe('rgb(25, 118, 210)')
            expect(morningSleep(date)).toBeInTheDocument()
            expect(getComputedStyle(morningSleep(date)).color).toBe('rgb(2, 136, 209)')
            expect(eveningFitness(date)).toBeInTheDocument()
            expect(getComputedStyle(eveningFitness(date)).color).toBe('rgb(237, 108, 2)')
        })
    })

    it('Add a new status', async () => {
        render(<Status />)

        userEvent.click(await screen.findByText('+ Status heute'))

        expect(await screen.findByText('31.03.2024')).toBeInTheDocument()
    })

    it('Edit morning', async () => {
        render(<Status />)

        const date = '01.01.2023'

        let morningPart: HTMLElement
        await waitFor(() => {
            morningPart = getMorningPart(date)
        })

        await userEvent.click(morningPart)


        const morningSleepDiv = (within(morningPart)!).getByText('Schlaf', { ignore: 'title' }).closest('div') as HTMLElement
        const morningSleepSlider = (within(morningSleepDiv)!).getByRole('slider')
        fireEvent.change(morningSleepSlider, { target: { value: 4 } })
        expect(getComputedStyle(morningSleep(date)).color).toBe('rgb(237, 108, 2)')
        // await waitFor(() => (expect(getComputedStyle(morningSleep(date)).color).toBe('rgb(25, 118, 210)')), { timeout: 400 })



        const morningFitnessSlider = (within(morningPart)!).getByText('Fitness', { ignore: 'title' })
        expect(morningFitnessSlider).toBeInTheDocument()
    })
})