import { Box, Container, IconButton, Input } from "@mui/material";
import useHista from "../../store/store";
import OverviewList from "../components/OverviewList";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { url } from "../../constants";
import { useEffect, useState } from "react";
import NoteIcon from '@mui/icons-material/Note';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function Notes() {
    const getNotes = useHista(state => state.getNotes)
    const createNote = useHista(state => state.postNote)
    const deleteNote = useHista(state => state.deleteNote)
    const notes = useHista(state => state.notes)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [filteredNotes, setFilteredNotes] = useState(notes)

    useEffect(() => {
        const filterResults = notes.filter(note =>
            note.text.toLowerCase().includes(searchValue.toLowerCase())
        )
        setFilteredNotes(filterResults)
    }, [notes, searchValue])


    const onClick = (id: number) => {
        navigate(url.NOTES + "/" + id)
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
            <Box >
                <Input
                    sx={{ marginTop: '1rem', width: '100%' }}
                    startAdornment={<SearchIcon />}
                    endAdornment={<IconButton
                        onClick={() => setSearchValue("")}>
                        <ClearIcon />
                    </IconButton>}
                    type='search'
                    value={searchValue}
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