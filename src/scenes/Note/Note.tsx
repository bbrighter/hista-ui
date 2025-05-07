import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';
import useHista from '../../store/store';
import DateInput from '../components/DateIpnut';

export default function Note() {
    const getNote = useHista(state => state.getNote)
    const patchNote = useHista(state => state.patchNote)
    const note = useHista(state => state.note)
    const params = useParams<{ id: string }>()
    const [textInput, setTextInput] = useState(note.text)
    const debouncedInputValue = useDebounce(textInput, 1000)
    const [isUpToDate, setIsUpToDate] = useState(true)

    useEffect(() => {
        getNote(Number(params.id))
    }, [getNote, params.id])

    useEffect(() => {
        setTextInput(note.text)
    }, [note])

    useDidUpdateEffect(() => {
        patchNote(note.id, undefined, debouncedInputValue).then(
            () => setIsUpToDate(true),
        )
    }, [debouncedInputValue])

    const onDateChange = (e: dayjs.Dayjs | null) => {
        const date = e || new Date()
        patchNote(note.id, date.toISOString(), undefined)
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
        setIsUpToDate(false)
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <FormGroup>
                <DateInput
                    title="Notiz"
                    date={note.date}
                    onChange={onDateChange}
                />
                <TextField
                    sx={{ marginTop: '1rem', height: '200px' }}
                    multiline
                    value={textInput}
                    onChange={onTextChange}
                    label="Notiz erstellen"
                    minRows={15}
                    color={isUpToDate ? 'primary' : 'secondary'}
                />
            </FormGroup>
        </Container>
    )
}