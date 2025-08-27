import Download from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import { Workbook } from 'exceljs';
import { useState } from 'react';

import { validHeadachePositions, validHeadacheSymptoms, validHeadacheTypes } from '../../../../store/headaches/headaches';
import useHista from '../../../../store/store';
import { headacheExcelColumnGrouping } from './headacheColumns';


export default function DownloadButton() {
    const [loading, setLoading] = useState(false)

    const getHeadaches = useHista(state => state.getHeadaches)


    const onClick = async () => {
        setLoading(true)
        const headaches = await getHeadaches()

        const book = new Workbook()
        const sheet = book.addWorksheet('Kopfschmerz')

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

        const data = headaches.map(h => (
            [
                h.date,
                h.severity,
                ...validHeadachePositions.map(v => h.positions.some(p => p.value == v.value) ? '✓' : ''),
                ...validHeadacheTypes.map(v => h.types.some(t => t.value == v.value) ? '✓' : ''),
                ...validHeadacheSymptoms.map(v => h.symptoms.some(s => s.value == v.value) ? '✓' : ''),
                h.description,
            ]
        ))

        sheet.addRows(data)
        sheet.getColumn(1).numFmt = 'dd.mm.yyyy hh:mm'
        sheet.columns.forEach(col => {
            let maxLength = 0
            col.eachCell({ includeEmpty: true }, (cell) => {
                const v = cell.value ? cell.value.toString() : ''
                maxLength = Math.max(maxLength, v.length)
            })
            col.width = maxLength + 2
        })

        const buffer = await book.xlsx.writeBuffer()
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'kopfschmerz.xlsx'
        link.click()
        URL.revokeObjectURL(url)
        setLoading(false)
    }



    return (
        <Button
            sx={{ marginTop: '1rem', marginBottom: '1rem' }}
            startIcon={<Download />}
            onClick={onClick}
            loading={loading}
            variant='outlined'
        >
            Kopfschmerzen herunterladen
        </Button>
    )
}