
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { useMemo, useState } from "react"

import {  useNotes } from "../../store"
import { AddNoteButton, NoteSearch, NotesList } from "./components"

export default function Notes() {
  const notes = useNotes()


  const [searchValue, setSearchValue] = useState("")

  const filteredNotes = useMemo(() => {
    const filterResults = notes.filter(note =>
      note.text.toLowerCase().includes(searchValue.toLowerCase()),
    )
    const items = filterResults.map((r) => {
      const maxTextLength = 25
      const shortText = r.text.length < maxTextLength
        ? r.text
        : r.text.substring(0, maxTextLength - 2) + "..."
      return {
        id: r.id,
        date: r.date,
        secondary: shortText,
      }
    })
    return items
  }, [searchValue, notes])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <Container sx={{ padding: "2rem" }}>
      <AddNoteButton/>
      <Box>
        <NoteSearch
          searchValue={searchValue}
          onClear={() => setSearchValue("")}
          onChange={handleSearchChange}
        />
      </Box>
      <NotesList notes={filteredNotes}/>
    </Container>
  )
}
