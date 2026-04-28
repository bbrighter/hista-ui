import Button from "@mui/material/Button"
import { useState } from "react";

import { Icons } from "../../components/Icons";
import { TemplateDialog } from "./TemplateDraft";


export const AddTemplate = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button 
        variant="contained"
        startIcon={<Icons.template/>}
        onClick={onOpen}
      >
        Neue Vorlage
      </Button>
      <TemplateDialog open={open} onClose={onClose}/>
    </>
  )
}