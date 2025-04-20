import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import useHista from '../../../store/store';
import ButtonGroup from '@mui/material/ButtonGroup';
import HeadacheDownloadButton from './HeadacheDownloadButton';
import Button from '@mui/material/Button';
import { Workbook } from 'exceljs';
import { RawDiary } from '../../../store/statistics/diary';

export default function Diary() {
    const diaryEntries = useHista(state => state.diaryEntries)
    const getDiaryEntries = useHista(state => state.getDiaryEntries)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (diaryEntries.length > 0) {
            setLoading(true)
            writeRawDiaryToExcel(diaryEntries)
        }
    }, [diaryEntries])

    const onClick = async () => {
        setLoading(true)
        await getDiaryEntries()
        setLoading(false)
    }

    return (
        <ButtonGroup
            sx={{ pt: 3 }}
            orientation='vertical'
        >
            <Button
                startIcon={<DownloadIcon />}
                variant="outlined"
                loading={loading}
                onClick={onClick}>
                Ernährungstagebuch exportieren
            </Button>
            <HeadacheDownloadButton />
        </ButtonGroup>
    )
}

const writeRawDiaryToExcel = async (diaryEntries: RawDiary[]) => {
    const book = new Workbook()
    const sheet = book.addWorksheet('Rohdaten')

    const columnHeaders = ['Datum', 'Stunde', 'Typ', 'Was', 'Schwere', 'Kategorie']

    columnHeaders.forEach((header, index) => {
        sheet.getCell(1, index + 1).value = header
    })

    const data = diaryEntries.map(entry => (
        [
            entry.DateString,
            entry.Hour,
            entry.Type,
            entry.What,
            entry.Severity,
            entry.Category,
        ]
    ))
    sheet.addRows(data)

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