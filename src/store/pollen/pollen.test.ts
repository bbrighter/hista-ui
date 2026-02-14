import { expect, test } from 'vitest'

import { entity } from '../../api/generatedApi'
import { respToPollens } from './pollen'

test('respToPollens', () => {
  const resp: entity.PollenEventsResponse = {
    pollens: [{
      date: '2002-12-01 12:00:30',
      pollens: [{
        type: 'Ambrosia',
        intensity: 3,
        intensityString: 'Mittel',
      }],
    }],
  }

  const pollens = respToPollens(resp)
  expect(pollens).toHaveLength(1)
  expect(pollens[0].date.getFullYear()).toBe(2002)
  expect(pollens[0].ambrosia.intensity).toBe(3)
  expect(pollens[0].ambrosia.intensityString).toBe('Mittel')
  // expect(pollens[0].pollens).toHaveLength(1)
  // expect(pollens[0].pollens[0].intensity).toBe(3)
  // expect(pollens[0].pollens[0].intensityString).toBe("Mittel")
  // expect(pollens[0].pollens[0].type).toBe("Ambrosia")
})
