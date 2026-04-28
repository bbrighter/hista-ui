import Button from "@mui/material/Button"
import { useState } from "react"

import { useAppNavigate } from "../../../hooks/useNavigate"
import { services } from "../../../store"
import { Icons } from "../../components/Icons"

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
      variant="contained"
      onClick={onCreate}
      loading={loading}
      startIcon={<Icons.notes />}
    >
      Neue Notiz
    </Button>
  )

}