import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Pollens from './Pollens';

describe('Everything is rendered', () => {
    it('Table is rendered', async () => {
        render(<Pollens />)


        const secondRow = (await screen.findByText('1.1.2024')).closest('[role="row"]') as HTMLElement
        const firstRow = screen.getByText('2.1.2024').closest('[role="row"]') as HTMLElement


        const columns = ['Ambrosia', 'Beifuss', 'Birke', 'Erle', 'Esche', 'Gräser', 'Hasel', 'Roggen']
        columns.forEach(c => {
            expect(screen.getByText(c), c).toBeInTheDocument()
        })

        expect(within(secondRow).getByText('Keine bis geringe')).toBeInTheDocument()
        expect(within(firstRow).getByText('Geringe')).toBeInTheDocument()
        expect(within(firstRow).getByText('Mittlere')).toBeInTheDocument()
    })
})