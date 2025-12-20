import { Workbook } from 'exceljs'
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

    const buffer = await book.xlsx.writeBuffer()
    const newBook = new Workbook()
    await newBook.xlsx.load(buffer)

    const sheet = newBook.getWorksheet('Rohdaten')

    const expectedColumns = ['Typ', 'Datum', 'Schwere', 'Inhalt', 'Kategorie']
    expectedColumns.forEach((col, i) => {
        expect(sheet.getRow(1).getCell(i + 1).value).toBe(col)
    })
    const expectedContent = ['Essen', new Date(2024, 1, 1, 12, 0), '3', 'Nudeln', 'Kategorie']
    expectedContent.forEach((con, i) => {
        expect(sheet.getRow(2).getCell(i + 1).value).toStrictEqual(con)
    })
})
