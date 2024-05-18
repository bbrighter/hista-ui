import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import useHista from "../../store/store";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { writeRawDiaryToExcel } from "./excel";


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
        <Container>
            <Typography>Ernährungstagebuch</Typography>
            <ButtonGroup variant="outlined">
                <LoadingButton
                    loading={loading}
                    onClick={onClick}>
                    Rohdaten
                </LoadingButton>
                <Button disabled>
                    Aggregiert nach Mahlzeit
                </Button>
                <Button disabled>
                    Aggregiert nach Symptom
                </Button>
            </ButtonGroup>
        </Container>
    )
}