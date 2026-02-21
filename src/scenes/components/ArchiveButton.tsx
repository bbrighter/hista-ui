import ArchiveIcon from "@mui/icons-material/Archive"
import UnarchiveIcon from "@mui/icons-material/Unarchive"
import IconButton from "@mui/material/IconButton"


export const ArchiveButton = ({ id, isArchived, onArchive }: { id: number, isArchived: boolean, onArchive: (id: number) => Promise<void> }) => {
  const onClick = () => {onArchive(id)}

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
