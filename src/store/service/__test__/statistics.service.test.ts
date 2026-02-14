import { expect, test } from 'vitest'

import useHista from '../../store'
import { statisticsService } from '../statistics.service'

test('get meal statistics', async () => {
    await statisticsService.getMealStatistics(new Date(), new Date(), 1)

    const { statistics, mealCount } = useHista.getState()
    expect(mealCount).toBe(5)
    expect(statistics).toHaveLength(3)
    expect(statistics).toContainEqual({ symptomId: 1, severity: 1, within1hour: 1, within24hours: 1, within72hours: 0 })
    expect(statistics).toContainEqual({ symptomId: 1, severity: 2, within1hour: 0, within24hours: 1, within72hours: 0 })
    expect(statistics).toContainEqual({ symptomId: 2, severity: 1, within1hour: 0, within24hours: 1, within72hours: 4 })
})
