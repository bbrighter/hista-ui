import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import useHista from '../../../store/store';
import { writeRawDiaryToExcel } from '../excel';
import LoadingButton from '@mui/lab/LoadingButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import HeadacheDownloadButton from './HeadacheDownloadButton';

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
            <LoadingButton
                startIcon={<DownloadIcon />}
                variant="outlined"
                loading={loading}
                onClick={onClick}>
                Ernährungstagebuch exportieren
            </LoadingButton>
            <HeadacheDownloadButton />
        </ButtonGroup>
    )
}