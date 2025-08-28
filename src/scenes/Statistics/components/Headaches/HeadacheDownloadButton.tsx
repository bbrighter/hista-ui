import Download from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import { useState } from 'react';

import useHista from '../../../../store/store';
import { buildHeadacheWorkbook } from './headacheExport';


export default function DownloadButton() {
    const [loading, setLoading] = useState(false)

    const getHeadaches = useHista(state => state.getHeadaches)

    const onClick = async () => {
        setLoading(true)
        const headaches = await getHeadaches()
        const book = buildHeadacheWorkbook(headaches)


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