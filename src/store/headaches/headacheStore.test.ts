import { beforeEach, describe, expect, it } from 'vitest'

import useHista from '../store'

describe('headache store', () => {
  beforeEach(async () => {
    expect(useHista.getState().isHeadacheLoaded).toBeFalsy()
    await useHista.getState().getHeadaches()
    expect(useHista.getState().isHeadacheLoaded).toBeTruthy()
  })

  it('get headaches', async () => {
    const headaches = useHista.getState().headaches
    expect(headaches).toHaveLength(1)
    const headache = headaches[0]
    expect(headache.date).toStrictEqual(new Date('2022-01-01T00:00:00Z'))
    expect(headache.id).toStrictEqual(1)
    expect(headache.description).toStrictEqual('description')
    expect(headache.positions).toHaveLength(2)
    expect(headache.symptoms).toHaveLength(2)
    expect(headache.types).toHaveLength(1)
    expect(headache.types[0]).toStrictEqual({ label: 'Stechend', value: 'stabbing' })
  })

  it('get one headache', async () => {
    await useHista.getState().getHeadache(1)

    const headache = useHista.getState().headache
    expect(headache.id).toBe(1)
    expect(headache.severity).toBe(3)
    expect(headache.description).toBe('description')
  })

  it('posts a new headache', async () => {
    const id = await useHista.getState().postHeadache()

    expect(id).toBe(2)
    expect(useHista.getState().headaches).toHaveLength(2)
    const headache = useHista.getState().headaches[0]
    expect(headache.id).toBe(2)
    expect(headache.severity).toBe(5)
    expect(headache.date.getTime() - new Date().getTime()).toBeLessThan(1000)
  })

  it('deletes a headache', async () => {
    await useHista.getState().deleteHeadache(1)

    expect(useHista.getState().headaches).toHaveLength(0)
  })
})
