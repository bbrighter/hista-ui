import { renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'

import useHista from '../../store'
import { useNonArchivedIngredients } from '../ingredients.selectors'

test('useNonArchivedIngredients', () => {
    const { setIngredients } = useHista.getState()
    setIngredients([
        { id: 1, name: 'name 1', isArchived: true },
        { id: 2, name: 'name 2', isArchived: false },
    ])

    const { result } = renderHook(() => useNonArchivedIngredients())
    expect(result.current).toHaveLength(1)
    expect(result.current[0]).toEqual({ id: 2, name: 'name 2', isArchived: false })
})
