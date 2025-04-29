import '../../__tests__/__mocks__/apiMocks'
import '../../__tests__/__mocks__/authStoreMock'
import '../../__tests__/__mocks__/errorStoreMock'
import { createTestStore } from '../../__tests__/storeUtils'
import { mockClient } from '../../__tests__/__mocks__/apiMocks'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { symptomsRespMock } from '../../__tests__/__mocks__/mockedResponses'
import { symptomsMock } from '../../__tests__/__mocks__/mockedStates'

describe('symptomStore', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        store = createTestStore()
        vi.clearAllMocks()
    })

    it('getSymptoms', async () => {
        mockClient.api.GetSymptoms.mockResolvedValue(symptomsRespMock)

        expect(store.getState().symptomsAreLoaded).toBeFalsy()
        await store.getState().getSymptoms()
        expect(store.getState().symptomsAreLoaded).toBeTruthy()
        expect(store.getState().symptoms).toHaveLength(2)
        expect(store.getState().symptoms[0].categoryName).toBe('Cat')
        expect(store.getState().symptoms[0].symptoms).toHaveLength(1)
    })

    it('deleteCategory', async () => {
        mockClient.api.DeleteSymptomCategory.mockResolvedValue(undefined)
        store.setState({
            ...store.getState(), symptoms: symptomsMock,
        })

        await store.getState().deleteCategory(2)
        expect(store.getState().symptoms).toHaveLength(1)
        expect(store.getState().symptoms[0].categoryId).toBe(1)
    })

    it('deleteCategory with error', async () => {
        mockClient.api.DeleteSymptomCategory.mockRejectedValue(undefined)
        store.setState({
            ...store.getState(), symptoms: symptomsMock,
        })

        await store.getState().deleteCategory(2)
        expect(store.getState().symptoms).toHaveLength(2)
    })

    it('changeSymptomCategory', async () => {
        mockClient.api.PatchSymptomCategory.mockResolvedValue(undefined)
        store.setState({
            ...store.getState(), symptoms: symptomsMock,
        })

        await store.getState().changeSymptomCategory(1, 1, 2)
        expect(store.getState().symptoms[0].symptoms).toHaveLength(1)
        expect(store.getState().symptoms[1].symptoms).toHaveLength(1)
        expect(store.getState().symptoms[0].symptoms[0].id).toBe(2)
        expect(store.getState().symptoms[1].symptoms[0].id).toBe(1)
    })

    it('changeSymptomName', async () => {
        mockClient.api.PatchSymptomName.mockResolvedValue(undefined)
        store.setState({
            ...store.getState(), symptoms: symptomsMock,
        })

        await store.getState().changeSymptomName(1, 'newName')
        expect(store.getState().symptoms[0].symptoms.find(s => s.id === 1).name).toBe('newName')
    })

    it('isCategoryNameAvailable', () => {
        store.setState({
            ...store.getState(), symptoms: symptomsMock,
        })

        expect(store.getState().isCategoryNameAvailable('Cat')).toBeFalsy()
        expect(store.getState().isCategoryNameAvailable('NewCat')).toBeTruthy()
    })

    it('isSymptomNameAvailable', () => {
        store.setState({
            ...store.getState(), symptoms: symptomsMock,
        })

        expect(store.getState().isSymptomNameAvailable('symptom1', 1)).toBeFalsy()
        expect(store.getState().isSymptomNameAvailable('symptom1', 2)).toBeTruthy()
    })
})