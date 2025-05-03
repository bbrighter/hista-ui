import { beforeEach, describe, expect, it } from 'vitest'
import useHista from '../store'


describe('symptomStore', () => {

    beforeEach(async () => {
        expect(useHista.getState().symptomsAreLoaded).toBeFalsy()
        await useHista.getState().getSymptoms()
    })


    it('getSymptoms', async () => {
        const store = useHista.getState()
        expect(store.symptomsAreLoaded).toBeTruthy()
        expect(store.symptoms).toHaveLength(2)
        expect(store.symptoms[0].categoryName).toBe('cat')
        expect(store.symptoms[0].symptoms).toHaveLength(2)
        expect(store.symptoms[0].symptoms[0].name).toBe('symptom1')
        expect(store.symptoms[1].symptoms).toHaveLength(0)
    })

    it('deleteCategory', async () => {
        await useHista.getState().deleteCategory(2)

        expect(useHista.getState().symptoms).toHaveLength(1)
        expect(useHista.getState().symptoms[0].categoryId).toBe(1)
    })

    it('change name of category', async () => {
        await useHista.getState().changeSymptomCategoryName(1, 'new cat')

        expect(useHista.getState().symptoms[0].categoryName).toBe('new cat')
    })

    it('move symptom to other category', async () => {
        await useHista.getState().changeSymptomCategory(1, 1, 2)

        const store = useHista.getState()
        expect(store.symptoms[0].symptoms).toHaveLength(1)
        expect(store.symptoms[1].symptoms).toHaveLength(1)
        expect(store.symptoms[1].symptoms[0].categoryId).toBe(2)
    })

    // it('deleteCategory with error', async () => {
    //     mockClient.api.DeleteSymptomCategory.mockRejectedValue(undefined)
    //     store.setState({
    //         ...store.getState(), symptoms: symptomsMock,
    //     })

    //     await store.getState().deleteCategory(2)
    //     expect(store.getState().symptoms).toHaveLength(2)
    // })

    it('changeSymptomName', async () => {
        await useHista.getState().changeSymptomName(1, 'newName')

        expect(useHista.getState().symptoms[0].symptoms.find(s => s.id === 1).name).toBe('newName')
    })

    it('isCategoryNameAvailable', () => {
        expect(useHista.getState().isCategoryNameAvailable('cat')).toBeFalsy()
        expect(useHista.getState().isCategoryNameAvailable('NewCat')).toBeTruthy()
    })

    it('isSymptomNameAvailable', () => {
        expect(useHista.getState().isSymptomNameAvailable('symptom1', 1)).toBeFalsy()
        expect(useHista.getState().isSymptomNameAvailable('symptom1', 2)).toBeTruthy()
    })
})