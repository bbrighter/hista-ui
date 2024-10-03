import useHista from '../../store/store';
import OverviewList from '../components/OverviewList';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { url } from '../../constants';
import { useEffect, useState } from 'react';
import NoteIcon from '@mui/icons-material/Note';
import NoteSearch from './components/NoteSearch';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Notes() {
    const getNotes = useHista(state => state.getNotes)
    const createNote = useHista(state => state.postNote)
    const deleteNote = useHista(state => state.deleteNote)
    const notes = useHista(state => state.notes)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [filteredNotes, setFilteredNotes] = useState<Array<{ id: number, date: Date, secondary: string }>>([])

    useEffect(() => {
        const filterResults = notes.filter(note =>
            note.text.toLowerCase().includes(searchValue.toLowerCase()),
        )
        const items = filterResults.map(r => {
            const maxTextLength = 25
            const shortText = r.text.length < maxTextLength
                ? r.text
                : r.text.substring(0, maxTextLength - 2) + '...'
            return {
                id: r.id,
                date: r.date,
                secondary: shortText,
            }
        })
        setFilteredNotes(items)
    }, [notes, searchValue])


    const onClick = (id: number) => {
        navigate(url.NOTES + '/' + id)
    }

    const onDelete = async (id: number) => {
        await deleteNote(id)
    }

    const onCreate = async () => {
        setLoading(true)
        const id = await createNote()
        setLoading(false)
        if (id) {
            navigate(url.NOTES + '/' + id)
        }
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <LoadingButton
                variant="outlined"
                onClick={onCreate}
                loading={loading}
                startIcon={<NoteIcon />}
            >
                Neue Notiz
            </LoadingButton>
            <Box>
                <NoteSearch
                    searchValue={searchValue}
                    onClear={() => setSearchValue('')}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Box>
            <OverviewList
                getData={getNotes}
                items={filteredNotes}
                onClick={onClick}
                onDelete={onDelete}
            />
        </Container>
    )
}