import { Workbook } from 'exceljs';

import { Headache } from '../../../../store/headaches/headaches';
import { headacheExcelColumnGrouping, headacheGridColumns, headacheRows } from './headacheColumns';

export const buildHeadacheWorkbook = (headaches: Array<Headache>): Workbook => {
    const book = new Workbook()
    const sheet = book.addWorksheet('Kopfschmerz')

    sheet.columns = headacheGridColumns.map(c => ({
        'header': c.headerName,
        'key': c.field,
    }))
    let currentCol = 1
    headacheExcelColumnGrouping.forEach(group => {
        const colCount = group.columns.length
        if (colCount == 1) {
            sheet.getCell(2, currentCol).value = group.columns[0]
        } else {
            sheet.mergeCells(1, currentCol, 1, currentCol + colCount - 1)
            sheet.getCell(1, currentCol).value = group.sharedHeader
            sheet.getCell(1, currentCol).alignment = { horizontal: 'center' }
            group.columns.forEach((col, i) => {
                sheet.getCell(2, currentCol + i).value = col
            })

        }
        currentCol += colCount
    })
    const data = headacheRows(headaches)
    sheet.addRows([...data])

    sheet.getColumn('date').numFmt = 'dd.mm.yyyy hh:mm'
    sheet.columns.forEach(col => {
        let maxLength = 0
        col.eachCell({ includeEmpty: true }, (cell) => {
            const v = cell.value ? cell.value.toString() : ''
            maxLength = Math.max(maxLength, v.length)
        })
        col.width = maxLength + 2
    })
    return book
}