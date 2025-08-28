import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

import useHista from '../../../../store/store';
import { buildDiaryWorkbook } from './diaryExport';

export default function DiaryDownloadButton() {
    const diaryEntries = useHista(state => state.diaryEntries)
    const onClick = async () => {
        const book = buildDiaryWorkbook(diaryEntries)

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