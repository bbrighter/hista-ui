import TextField from "@mui/material/TextField"

import { DraftStateType } from "./useTemplateDraft"

export const NameInput = ({ name, onChangeName }: DraftStateType) => {
  return (
    <TextField 
      sx={{ mb: "2rem" }}
      label="Name"
      value={name}
      onChange={(e) => onChangeName(e.currentTarget.value)}
    />
  )
}