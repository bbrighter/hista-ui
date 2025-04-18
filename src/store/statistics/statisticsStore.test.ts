import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestStore } from '../../__tests__/storeUtils'
import { mockClient } from '../../__tests__/__mocks__/apiMocks'
import { diaryRespMock } from '../../__tests__/__mocks__/mockedResponses'
import { mealConstants } from '../../constants'

describe('statisticsStore', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })

    it('getDiaryEntries', async () => {
        mockClient.api.GetDiary.mockResolvedValue(diaryRespMock)

        await store.getState().getDiaryEntries()
        expect(store.getState().diaryEntries).toHaveLength(2)
        const food = store.getState().diaryEntries[0]
        expect(food.Typ).toStrictEqual('Essen')
        expect(food.Schwere).toStrictEqual(mealConstants.RAW)

        const symptom = store.getState().diaryEntries[1]
        expect(symptom.Typ).toStrictEqual('Symptom')
        expect(symptom.Schwere).toStrictEqual('3')

    })

    it.skip('getFoodStatistics', async () => {

    })

    it.skip('getSymptomStatistics', async () => {

    })

    it('resetStatistics', () => {
        store.setState({
            ...store.getState(),
            foodStatistics: [{ count: 1, foodCondition: '', ingredientId: 3, within1hour: 3, within24hours: 5, within72hours: 12 }],
            symptomStatistics: [{ count: 1, severity: 3, symptomId: 3, within1hour: 3, within24hours: 12, within72hours: 38, symptomName: 'n' }],
        })

        store.getState().resetStatistics()

        expect(store.getState().foodStatistics).toHaveLength(0)
        expect(store.getState().symptomStatistics).toHaveLength(0)
    })
})
