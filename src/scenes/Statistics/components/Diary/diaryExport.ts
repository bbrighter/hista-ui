import { Workbook } from 'exceljs';

import { RawDiary } from '../../../../store/statistics/diary';
import { diaryGridColumns, diaryRows } from './diaryColumns';

export function buildDiaryWorkbook(diary: RawDiary[]): Workbook {
    const book = new Workbook();
    const sheet = book.addWorksheet('Rohdaten');

    sheet.columns = diaryGridColumns.map(c => ({
        key: c.field,
        header: c.headerName,
    }))

    const data = diaryRows(diary)
    sheet.addRows([...data])


    sheet.columns.forEach(col => {
        let maxLength = 0
        col.eachCell({ includeEmpty: true }, (cell) => {
            const v = cell.value ? cell.value.toString() : ''
            maxLength = Math.max(maxLength, v.length)
        })
        col.width = maxLength + 2
    })
    sheet.getColumn('date').numFmt = 'dd.mm.YYYY hh:mm'

    return book;
}

