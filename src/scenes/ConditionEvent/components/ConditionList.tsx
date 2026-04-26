import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { services, useConditionsWithSymptoms } from "../../../store"
import Severity from "./Severity"

export default function ConditionList() {
  const conditionsAndCategories = useConditionsWithSymptoms()

  const onDelete = (conditionId: number) => {
    services.conditions.delete(conditionId)
  }

  return (
    <List>
      {conditionsAndCategories.map(con => (
        <ListItem
          data-testid={`condition-list-item-${con.id}`}
          key={con.id}
          secondaryAction={(
            <IconButton
              onClick={() => onDelete(con.id)}
              title="Löschen"
            >
              <DeleteIcon />
            </IconButton>
          )}
        >
          <ListItemText
            primary={con.symptomName ?? "Unbekannt"}
            secondary={con.catName ?? "Unbekannt"}
          />
          <Severity
            conditionId={con.id}
            severity={con.severity}
          />
        </ListItem>
      ))}
    </List>
  )
}
