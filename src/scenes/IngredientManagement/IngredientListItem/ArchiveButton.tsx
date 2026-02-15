import ArchiveIcon from "@mui/icons-material/Archive"
import UnarchiveIcon from "@mui/icons-material/Unarchive"
import IconButton from "@mui/material/IconButton"

import { ingredientsService } from "../../../store/service/ingredients.service"

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
        ? <UnarchiveIcon color="disabled" />
        : <ArchiveIcon />}
    </IconButton>
  )
}
