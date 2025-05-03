import { beforeEach, describe, expect, it } from 'vitest'
import useHista from '../store'

describe('conditionStore', () => {

    beforeEach(async () => {
        await useHista.getState().getConditionEvents()
        await useHista.getState().getConditionEvent(1)
    })

    it('getConditionEvents', async () => {
        const store = useHista.getState()
        expect(store.conditionEvents).toHaveLength(1)
        expect(store.conditionEvents[0].id).toStrictEqual(1)
        expect(store.conditionEvents[0].date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('postConditionEvent', async () => {
        await useHista.getState().postConditionEvent()

        const store = useHista.getState()
        expect(store.conditionEvents).toHaveLength(2)
        expect(store.conditionEvents[0].id).toStrictEqual(2)
        expect(store.conditionEvents[0].date, 'sorted desc by date').toStrictEqual(new Date('2025-01-31T12:00:00Z'))
    })

    it('get one condition event', async () => {
        const event = useHista.getState().conditionEvent
        expect(event.id).toBe(1)
        expect(event.date).toStrictEqual(new Date('2024-01-01T00:00:00Z'))
        expect(event.conditions).toHaveLength(1)
        expect(event.conditions[0].id).toStrictEqual(1)
        expect(event.conditions[0].severity).toStrictEqual(3)
        expect(event.conditions[0].symptom.name).toBe('symptom1')
    })

    it('delete one condition event', async () => {
        await useHista.getState().deleteConditionEvent(1)

        expect(useHista.getState().conditionEvents).toHaveLength(0)
    })

    it('change condition event date', async () => {
        await useHista.getState().setConditionEventDate(new Date('2000-06-06T13:45:00Z'))

        expect(useHista.getState().conditionEvent.date).toStrictEqual(new Date('2000-06-06T13:45:00Z'))
    })

    it('add new condition to event', async () => {
        await useHista.getState().postCondition(1, 1, undefined)

        const event = useHista.getState().conditionEvent
        expect(event.conditions).toHaveLength(2)

    })
})