import { Workbook } from 'exceljs';
import { expect, test } from 'vitest';

import { Headache } from '../../../../store/headaches/headaches';
import { buildHeadacheWorkbook } from './headacheExport';

test('headache workbook', async () => {
    const headaches: Array<Headache> = [
        {
            date: new Date(2024, 1, 1, 12, 0),
            description: 'desc',
            id: 1,
            positions: [{ value: 'left', label: 'Links' }],
            severity: 3,
            symptoms: [
                { value: 'short-term memory', label: 'Kurzzeitgedächtnis' },
                { value: 'tinnitus', label: 'Tinnitus' },
            ],
            types: [{ value: 'stabbing', label: 'Stechend' }],
        },
    ]

    const book = buildHeadacheWorkbook(headaches)

    const buffer = await book.xlsx.writeBuffer();
    const newBook = new Workbook();
    await newBook.xlsx.load(buffer);

    const sheet = newBook.getWorksheet('Kopfschmerz')
    const expectedColumns = [
        { column: 1, header: 'Zeit' },
        { column: 2, header: 'Schwere' },
        { column: 3, header: 'Position' },
        { column: 13, header: 'Typen' },
        { column: 17, header: 'Symptome' },
        { column: 29, header: 'Beschreibung' },
    ]
    expectedColumns.forEach(col => {
        expect(sheet.getRow(1).getCell(col.column).value).toBe(col.header)
    })

    const expectedContent = [
        { column: 1, value: new Date(2024, 1, 1, 12, 0) },
        { column: 2, value: 3 },
        { column: 3, value: '✓' }, // Left
        { column: 4, value: null },
        { column: 13, value: null },
        { column: 17, value: '✓' },
        { column: 29, value: 'desc' },
    ]
    expectedContent.forEach(con => {
        expect(sheet.getRow(3).getCell(con.column).value).toStrictEqual(con.value)
    })
})