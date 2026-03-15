import EditIcon from "@mui/icons-material/Edit"
import ButtonGroup from "@mui/material/ButtonGroup"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { useState } from "react"

import { Nutrition } from "../../../store"
import { ArchiveButton } from "./ArchiveButton"
import { EditIngredientName } from "./EditIngredientName"
import { EditNutritionButton } from "./EditNutritionButton"

export const IngredientListItem = ({ name, id, isArchived, nutrition }: { name: string, id: number, isArchived: boolean, nutrition?: Nutrition }) => {
  const [isEditing, setIsEditing] = useState(false)

  const onEdit = () => setIsEditing(!isEditing)

  const nutritions = [
    { label: "F", value: nutrition?.fat },
    { label: "K", value: nutrition?.carbohydrate },
    { label: "B", value: nutrition?.fiber },
    { label: "E", value: nutrition?.protein },
  ]

  return (
    <ListItem secondaryAction={(
      <ButtonGroup>
        <IconButton onClick={onEdit} data-testid="editButton">
          <EditIcon />
        </IconButton>
        <EditNutritionButton id={id} nutrition={nutrition}/>
        <ArchiveButton id={id} isArchived={isArchived} />
      </ButtonGroup>
    )}
    >
      {isEditing && <EditIngredientName id={id} name={name} onCancel={() => setIsEditing(false)} />}
      {!isEditing && <ListItemText 
        primary={name} 
        secondary={nutrition ? nutritions.map(n => `${n.label}: ${n.value.toLocaleString("de-DE")}`).join(" | ") :undefined }
      />}
    </ListItem>
  )
}
