import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import Modal from "@mui/material/Modal"
import { useState } from "react"

import { actions } from "../../../actions"
import { useIsCategoryNameAvailable } from "../../../store"
import { Icons } from "../../components/Icons"
import TextFieldSaveAndAbort from "../../components/TextFieldSaveAndAbort"

export default function AddSymptomCategory() {
  const [open, setOpen] = useState(false)
  const isCategoryNameAvailable = useIsCategoryNameAvailable()

  const closeModal = () => setOpen(false)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const onSave = async (v: string) => {
    await actions.symptoms.postCategory(v)
    closeModal()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
      >
        <Box sx={style}>
          <TextFieldSaveAndAbort
            label="Kategoriename"
            value=""
            isSaveable={isCategoryNameAvailable}
            onSave={onSave}
            size="medium"
            onCancel={closeModal}
          />
        </Box>
      </Modal>
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setOpen(!open)}
      >
        <Icons.actions.create />
        {" "}
        Neue Kategorie
      </Fab>
    </>
  )
}
