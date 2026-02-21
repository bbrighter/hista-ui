import EditIcon from "@mui/icons-material/Edit"
import ButtonGroup from "@mui/material/ButtonGroup"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { useState } from "react"

import { Medicine, medicinesService, useIsNameUnique } from "../../../store"
import { ArchiveButton } from "../../components/ArchiveButton"
import TextFieldSaveAndAbort from "../../components/TextFieldSaveAndAbort"

export const MedicineListItem = ({ medicine }: {medicine: Medicine}) => {
  const [isEditing, setIsEditing] = useState(false)
  const onEdit = () => setIsEditing(true)

  const onArchive =(id: number) =>  medicinesService.archiveMedicine(id)
    
  return (
    <ListItem secondaryAction={(
      <ButtonGroup>
        <IconButton onClick={onEdit} data-testid="editButton">
          <EditIcon />
        </IconButton>
        <ArchiveButton id={medicine.id} isArchived={medicine.isArchived} onArchive={onArchive} />
      </ButtonGroup>
    )}
    >
      {isEditing && <EditMedicineName id={medicine.id} name={medicine.name} onCancel={() => setIsEditing(false)} />}
      {!isEditing && <ListItemText primary={medicine.name} sx={medicine.isArchived ? { color: "gray" } :{}}/>}
    </ListItem>
  )
}


const EditMedicineName = ({ id, name, onCancel }: Partial<Medicine> & {onCancel: () => void}) => {
  const isSaveable = useIsNameUnique()
  const onSave = async (v: string) => {
    await medicinesService.renameMedicine(id, v)
    onCancel()
  }

  return (<TextFieldSaveAndAbort 
    label="Medikament" 
    value={name} 
    isSaveable={isSaveable} 
    onSave={onSave}
    onCancel={onCancel} 
    size="small"/>
  )
}