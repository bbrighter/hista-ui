import { beforeEach, describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import useHista from '../store';


describe('statusStore', () => {
    beforeEach(async () => {
        await useHista.getState().getStatuses()

    })

    it('getStatuses', async () => {
        const statuses = useHista.getState().statuses
        expect(statuses).toHaveLength(2)

        const latestStatus = statuses[0]
        expect(latestStatus.date).toStrictEqual(dayjs('2024-01-01T13:00:00Z'))
        expect(latestStatus.id).toBe(1)
        expect(latestStatus.morning).toBeDefined()
        expect(latestStatus.morning.fitness).toBe(3)
        expect(latestStatus.morning.sleep).toBe(2)
        expect(latestStatus.morning.timeOfDay).toBe('morning')
        expect(latestStatus.evening).toBeDefined()
        expect(latestStatus.evening.fitness).toBe(1)
        expect(latestStatus.evening.timeOfDay).toBe('evening')

        const oldStatus = statuses[1]
        expect(oldStatus.date).toStrictEqual(dayjs('2023-01-01T14:00:00Z'))
        expect(oldStatus.id).toBe(2)
        expect(oldStatus.morning).toBeDefined()
        expect(oldStatus.evening).not.toBeDefined()
    })

    it('post status', async () => {
        await useHista.getState().addStatus(dayjs('2024-03-31T00:00:00'))

        const statuses = useHista.getState().statuses
        expect(statuses).toHaveLength(3)
        expect(statuses[0].date).toStrictEqual(dayjs('2024-03-31T00:00:00'))
    })

    it('updateStatus', async () => {
        await useHista.getState().updateStatus({
            date: dayjs('2024-03-31T00:00:00'),
            fitness: 1,
            timeOfDay: 'evening',
            morningOrEveningId: 4,
            statusId: 2,
        })

        const status = useHista.getState().statuses.find(s => s.id == 2)
        expect(status).toBeDefined()
        expect(status.evening.fitness).toBe(1)
    })

    it('deleteStatus', async () => {
        await useHista.getState().deleteStatus(1)

        expect(useHista.getState().statuses).toHaveLength(1)
    })
})