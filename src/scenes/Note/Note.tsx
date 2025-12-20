import Container from '@mui/material/Container'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useDebounce from '../../hooks/useDebounce'
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect'
import useHista from '../../store/store'
import DateInput from '../components/DateInput'

export default function Note() {
    const getNote = useHista(state => state.getNote)
    const patchNote = useHista(state => state.patchNote)
    const note = useHista(state => state.note)
    const params = useParams<{ noteId: string }>()
    const [textInput, setTextInput] = useState(note.text)
    const debouncedInputValue = useDebounce(textInput, 1000)
    const [isUpToDate, setIsUpToDate] = useState(true)

    useEffect(() => {
        getNote(Number(params.noteId))
    }, [params.noteId])

    useEffect(() => {
        setTextInput(note.text)
    }, [note.text])

    useDidUpdateEffect(() => {
        patchNote(note.id, undefined, debouncedInputValue).then(
            () => setIsUpToDate(true),
        )
    }, [debouncedInputValue])

    const onDateChange = (e: dayjs.Dayjs | null) => {
        const isoDate = (e ?? dayjs()).toISOString()
        patchNote(note.id, isoDate, undefined)
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
        setIsUpToDate(false)
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <FormGroup>
                <DateInput
                  title="Zeit"
                  date={note.date}
                  onChange={onDateChange}
                />
                <TextField
                  helperText={isUpToDate ? '' : 'Noch nicht gespeichert...'}
                  sx={{ marginTop: '1rem', height: '200px' }}
                  multiline
                  value={textInput}
                  onChange={onTextChange}
                  label="Notiz"
                  minRows={15}
                  color={isUpToDate ? 'primary' : 'secondary'}
                />
            </FormGroup>
        </Container>
    )
}
