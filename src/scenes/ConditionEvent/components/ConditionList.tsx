import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { actions } from "../../../actions"
import { Icons } from "../../components/Icons"
import { useConditionsWithSymptoms } from "./hooks"
import Severity from "./Severity"

export default function ConditionList() {
  const conditionsAndCategories = useConditionsWithSymptoms()

  const onDelete = (conditionId: number) => {
    actions.conditions.delete(conditionId)
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
              <Icons.actions.delete />
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
