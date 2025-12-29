import { expect, test } from 'vitest'

import { RawDiary } from '../../../../store/statistics/diary'
import { buildDiaryWorkbook } from './diaryExport'

test('diary export', async () => {
    const diary: Array<RawDiary> = [
        {
            Category: 'Kategorie',
            Date: new Date(2024, 1, 1, 12, 0),
            Severity: '3',
            Type: 'Essen',
            What: 'Nudeln',
        },
    ]

    const book = buildDiaryWorkbook(diary)

    expect(book.Sheets['Tagebuch']).toBeDefined()
    const sheet = book.Sheets['Tagebuch']

    const expectedColumns = [
        { cell: 'A1', value: 'Typ' },
        { cell: 'B1', value: 'Datum' },
        { cell: 'C1', value: 'Schwere' },
        { cell: 'D1', value: 'Inhalt' },
        { cell: 'E1', value: 'Kategorie' },
    ]
    expectedColumns.forEach(({ cell, value }) => {
        expect(sheet[cell]['v']).toBe(value)
    })

    const expectedContent = [
        { cell: 'A2', value: 'Essen' },
        { cell: 'B2', value: new Date(2024, 1, 1, 12, 0) },
        { cell: 'C2', value: '3' },
        { cell: 'D2', value: 'Nudeln' },
        { cell: 'E2', value: 'Kategorie' },
    ]
    expectedContent.forEach(({ cell, value }) => {
        expect(sheet[cell]['v']).toStrictEqual(value)
    })

    const dateFormat = { cell: 'B2', format: 'dd.mm.yyyy hh:mm' }
    expect(sheet[dateFormat.cell]['z']).toBe(dateFormat.format)
})
