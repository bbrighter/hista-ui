import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import useHista from "../../store/store";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { utils, writeFile } from "xlsx";
import { RawDiary } from "../../store/statistics/diary";


export default function Statistics() {
    const diaryEntries = useHista(state => state.diaryEntries)
    const getDiaryEntries = useHista(state => state.getDiaryEntries)

    const [isLoadingState, setIsLoadingState] = useState<'idle' | 'loading' | 'done'>('idle')

    const renameColumnHeaders = (entries: Array<RawDiary>) => {
        return entries.map(e => ({
            "Datum": e.date,
            "Uhrzeit": e.hour,
            "Typ": e.type == 'Food' ? "Essen" : "Symptom",
            "Was": e.content,
        }))
    }

    const onClick = async () => {
        setIsLoadingState('loading')
        await getDiaryEntries()
        const germanEntries = renameColumnHeaders(diaryEntries)
        const worksheet = utils.json_to_sheet(germanEntries)
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, "Rohdaten")
        writeFile(workbook, filename + '.xlsx')
        setIsLoadingState('done')
    }

    const today = new Date()
    const filename = "Ernährungstagebuch_" + today.toISOString().slice(0, 10).replace(/-/g, "");




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