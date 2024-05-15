import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import useHista from "../../store/store";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { writeRawDiaryToExcel } from "./excel";


export default function Statistics() {
    const diaryEntries = useHista(state => state.diaryEntries)
    const getDiaryEntries = useHista(state => state.getDiaryEntries)

    const [isLoadingState, setIsLoadingState] = useState<'idle' | 'loading' | 'done'>('idle')

    useEffect(() => {
        if (diaryEntries.length > 0) {
            setIsLoadingState('loading')
            writeRawDiaryToExcel(diaryEntries)
            setIsLoadingState('done')
        }
    }, [diaryEntries])

    const onClick = async () => {
        await getDiaryEntries()
    }

    return (
        <Container>
            <Typography>Ernährungstagebuch</Typography>
            <ButtonGroup variant="outlined">
                <LoadingButton
                    loading={isLoadingState == 'loading'}
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