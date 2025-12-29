import Download from '@mui/icons-material/Download'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { writeFile } from 'xlsx'

import useHista from '../../../../store/store'
import { buildHeadacheWorkbook } from './headacheExport'

export default function DownloadButton() {
    const [loading, setLoading] = useState(false)

    const getHeadaches = useHista(state => state.getHeadaches)

    const onClick = async () => {
        setLoading(true)
        const headaches = await getHeadaches()
        const workbook = buildHeadacheWorkbook(headaches)
        writeFile(workbook, 'Kopfschmerz.xlsx')
        setLoading(false)
    }

    return (
        <Button
          sx={{ marginTop: '1rem', marginBottom: '1rem' }}
          startIcon={<Download />}
          onClick={onClick}
          loading={loading}
          variant="outlined"
        >
            Kopfschmerzen herunterladen
        </Button>
    )
}
