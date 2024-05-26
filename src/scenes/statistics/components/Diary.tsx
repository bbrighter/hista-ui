
import DownloadIcon from '@mui/icons-material/Download';
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import useHista from '../../../store/store';
import { writeRawDiaryToExcel } from '../excel';

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
        <LoadingButton
            sx={{ mt: 2 }}
            startIcon={<DownloadIcon />}
            variant="outlined"
            loading={loading}
            onClick={onClick}>
            Ernährungstagebuch exportieren
        </LoadingButton>
    )
}