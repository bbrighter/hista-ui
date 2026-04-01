import NoteIcon from "@mui/icons-material/Note"
import Button from "@mui/material/Button"
import { useState } from "react"

import { useAppNavigate } from "../../../hooks/useNavigate"
import { services } from "../../../store"

export const AddNoteButton = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useAppNavigate()

  const onCreate = async () => {
    setLoading(true)
    const id = await services.notes.post()
    setLoading(false)
    if (id) {
      navigate.to.noteDetails(id)
    }
  }
  
  return (
    <Button
      variant="outlined"
      onClick={onCreate}
      loading={loading}
      startIcon={<NoteIcon />}
    >
      Neue Notiz
    </Button>
  )

}