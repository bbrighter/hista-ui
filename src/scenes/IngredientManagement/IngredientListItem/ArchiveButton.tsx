import IconButton from "@mui/material/IconButton"

import { ingredientsService } from "../../../store"
import { Icons } from "../../components/Icons"

export const ArchiveButton = ({ id, isArchived }: { id: number, isArchived: boolean }) => {
  const onClick = () => {
    ingredientsService.archive(id)
  }

  return (
    <IconButton
      onClick={onClick}
      data-testid="archiveButton"
    >
      {isArchived
        ? <Icons.actions.unarchive color="disabled" />
        : <Icons.actions.archive />}
    </IconButton>
  )
}
