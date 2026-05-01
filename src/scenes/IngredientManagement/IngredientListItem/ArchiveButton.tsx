import IconButton from "@mui/material/IconButton"

import { actions } from "../../../actions"
import { Icons } from "../../components/Icons"

export const ArchiveButton = ({ id, isArchived }: { id: number, isArchived: boolean }) => {
  const onClick = () => {
    actions.ingredients.archive(id)
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
