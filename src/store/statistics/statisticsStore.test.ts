import { describe, expect, it } from 'vitest'

import useHista from '../store'

describe('statisticsStore - SKIPPED! Better use component tests!', () => {
    it.skip('getDiaryEntries', async () => {

    })

    it.skip('getFoodStatistics', async () => {

    })

    it.skip('getSymptomStatistics', async () => {

    })

    it('resetStatistics', () => {
        useHista.getState().resetStatistics()

        expect(useHista.getState().foodStatistics).toHaveLength(0)
        expect(useHista.getState().symptomStatistics).toHaveLength(0)
    })
})
