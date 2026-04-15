import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Button from "@mui/material/Button"
import { useState } from "react";

import { TemplateDialog } from "./TemplateDraft";


export const AddTemplate = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button 
        variant="contained"
        startIcon={<ContentPasteIcon/>}
        onClick={onOpen}
      >
        Neue Vorlage
      </Button>
      <TemplateDialog open={open} onClose={onClose}/>
    </>
  )
}