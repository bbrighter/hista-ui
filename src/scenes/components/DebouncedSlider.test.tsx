import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DebouncedSlider from './DebouncedSlider';

describe('debounced slider', () => {
    const onChange = vi.fn()
    const debounceTimeMs = 50

    it('renders and change is possible', async () => {
        render(<DebouncedSlider
            initialValue={0}
            onChange={onChange}
            label='label'
            debounceTimeMs={debounceTimeMs}
        />)

        expect(screen.getByText('label')).toBeInTheDocument()
        const slider = screen.getByRole('slider')
        expect(slider).toBeInTheDocument()
        expect(slider).toHaveValue('0')

        fireEvent.change(slider, { target: { value: 1 } })
        expect(onChange, 'onChange not called before debounce time').not.toHaveBeenCalled()
        expect(slider).toHaveValue('1')

        await waitFor(
            () => expect(onChange, 'Called within the debounce time').toHaveBeenCalled(),
            { timeout: debounceTimeMs * 4 },
        )

        expect(slider, 'Also have the value after debounce time').toHaveValue('1')

    })

})