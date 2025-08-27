import Download from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import { Workbook } from 'exceljs';
import { useState } from 'react';

import { validHeadachePositions, validHeadacheSymptoms, validHeadacheTypes } from '../../../store/headaches/headaches';
import useHista from '../../../store/store';


export default function DownloadButton() {
    const [loading, setLoading] = useState(false)

    const getHeadaches = useHista(state => state.getHeadaches)


    const onClick = async () => {
        setLoading(true)
        const headaches = await getHeadaches()

        const book = new Workbook()
        const sheet = book.addWorksheet('Kopfschmerz')

        const columnHeaders = [
            {
                sharedHeader: '',
                columns: ['Datum'],
            },
            {
                sharedHeader: '',
                columns: ['Schwere'],
            },
            {
                sharedHeader: 'Position',
                columns: validHeadachePositions.map(p => p.label),
            },
            {
                sharedHeader: 'Typ',
                columns: validHeadacheTypes.map(t => t.label),
            },
            {
                sharedHeader: 'Symptom',
                columns: validHeadacheSymptoms.map(s => s.label),
            },
            {
                sharedHeader: '',
                columns: ['Notizen'],
            },
        ]

        let currentCol = 1
        columnHeaders.forEach(group => {
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
                ...validHeadachePositions.map(v => h.positions.some(p => p.value == v.value) ? 'x' : ''),
                ...validHeadacheTypes.map(v => h.types.some(t => t.value == v.value) ? 'x' : ''),
                ...validHeadacheSymptoms.map(v => h.symptoms.some(s => s.value == v.value) ? 'x' : ''),
                h.description,
            ]
        ))

        sheet.addRows(data)
        sheet.getColumn(1).numFmt = 'dd.mm.yyyy hh:mm'

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