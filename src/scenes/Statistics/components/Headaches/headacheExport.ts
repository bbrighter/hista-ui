import { utils, WorkBook } from 'xlsx'

import { Headache } from '../../../../store/headaches/headaches'
import { excelHeaderColumns, headacheExcelRows } from './headacheColumns'

export const buildHeadacheWorkbook = (headaches: Array<Headache>): WorkBook => {
    const data = headacheExcelRows(headaches)
    const rows = [...excelHeaderColumns, ...data]
    const worksheet = utils.aoa_to_sheet(rows)
    const dateRange = { s: { r: 0, c: 0 }, e: { r: 64000, c: 0 } }
    for (let R = dateRange.s.r; R < dateRange.e.r; R++) {
        const cellAddress = { r: R, c: dateRange.s.c }
        const cellRef = utils.encode_cell(cellAddress)
        if (!worksheet[cellRef]) continue
        worksheet[cellRef].z = 'dd.mm.yyyy hh:mm'
    }
    worksheet['!merges'] = [
        { s: { r: 0, c: 2 }, e: { r: 0, c: 12 } },
        { s: { r: 0, c: 13 }, e: { r: 0, c: 15 } },
        { s: { r: 0, c: 16 }, e: { r: 0, c: 28 } },
    ]
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Kopfschmerz')
    return workbook
}
