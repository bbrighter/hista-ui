import Container from "@mui/material/Container"
import FormGroup from "@mui/material/FormGroup"
import { useParams } from "react-router-dom"

import { usePiidEffect } from "../../hooks/usePiidEffect"
import { services } from "../../store"
import { NoteDateInput, NoteTextField } from "./components"

export const Note = () => {
  const params = useParams<{ noteId: string }>()
  const noteId = Number(params.noteId)

  usePiidEffect(() => {
    services.notes.list()
  }, [params.noteId])


  return (
    <Container sx={{ padding: "2rem" }}>
      <FormGroup>
        <NoteDateInput noteId={noteId}/>
        <NoteTextField noteId={noteId}/>
      </FormGroup>
    </Container>
  )
}
