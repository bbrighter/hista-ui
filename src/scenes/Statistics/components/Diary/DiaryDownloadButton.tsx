import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import { Workbook } from 'exceljs';

import { RawDiary } from '../../../../store/statistics/diary';
import useHista from '../../../../store/store';
import { diaryExcelColumns, diaryRows } from './diaryColumns';

export default function DiaryDownloadButton() {
    const diaryEntries = useHista(state => state.diaryEntries)
    const onClick = async () => {
        writeRawDiaryToExcel(diaryEntries)
    }

    return (
        <Button
            sx={{ marginTop: '1rem', marginBottom: '1rem' }}
            startIcon={<DownloadIcon />}
            variant="outlined"
            onClick={onClick}>
            Ernährungstagebuch herunterladen
        </Button>
    )
}

const writeRawDiaryToExcel = async (diaryEntries: RawDiary[]) => {
    const book = new Workbook()
    const sheet = book.addWorksheet('Rohdaten')

    sheet.columns = diaryExcelColumns
    const data = diaryRows(diaryEntries)
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

    const buffer = await book.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Ernährungstagebuch_' + new Date().toISOString().slice(0, 10).replace(/-/g, '')
    link.click()
    URL.revokeObjectURL(url)
}