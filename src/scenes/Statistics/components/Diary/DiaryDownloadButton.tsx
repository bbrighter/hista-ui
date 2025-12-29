import DownloadIcon from '@mui/icons-material/Download'
import Button from '@mui/material/Button'
import { writeFile } from 'xlsx'

import useHista from '../../../../store/store'
import { buildDiaryWorkbook } from './diaryExport'

export default function DiaryDownloadButton() {
    const diaryEntries = useHista(state => state.diaryEntries)
    const onClick = async () => {
        const workbook = buildDiaryWorkbook(diaryEntries)
        writeFile(workbook, 'tagebuch.xlsx')
    }

    return (
        <Button
          sx={{ marginTop: '1rem', marginBottom: '1rem' }}
          startIcon={<DownloadIcon />}
          variant="outlined"
          onClick={onClick}
        >
            Ernährungstagebuch herunterladen
        </Button>
    )
}
