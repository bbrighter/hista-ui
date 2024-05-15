import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import useHista from "../../store/store";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";


export default function Statistics() {
    const diaryEntries = useHista(state => state.diaryEntries)
    const getDiaryEntries = useHista(state => state.getDiaryEntries)

    const [isLoadingState, setIsLoadingState] = useState<'idle' | 'loading' | 'done'>('idle')

    useEffect(() => {
        if (diaryEntries.length > 0) {
            setIsLoadingState('loading')
            const worksheet = utils.json_to_sheet(diaryEntries)
            utils.sheet_add_aoa(worksheet, [["Datum", "Uhrzeit", "Typ", "Was"]], { origin: "A1" })
            const workbook = utils.book_new()
            utils.book_append_sheet(workbook, worksheet, "Rohdaten")

            const today = new Date()
            const filename = "Ernährungstagebuch_" + today.toISOString().slice(0, 10).replace(/-/g, "")
            writeFile(workbook, filename + '.xlsx')
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