import { Container, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import useHista from "../../store/store";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { writeRawDiaryToExcel } from "./excel";
import Charts from "./Charts";


export default function Statistics() {
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
        <Container sx={{ padding: '2rem' }}>
            <Typography variant='caption'>Ernährungstagebuch</Typography>
            <div>
                <LoadingButton
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    loading={loading}
                    onClick={onClick}>
                    Rohdaten
                </LoadingButton>
            </div>
            <Charts />
        </Container>
    )
}