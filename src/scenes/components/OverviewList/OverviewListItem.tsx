
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useState } from "react"
import { SwipeableListItem } from "react-swipeable-list"

import { formatDate } from "../../../utils/formatDate"
import { Icons } from "../Icons"
import { swipeDeleteItem, swipeSetNow } from "./ListActions"

export function OverviewListItem(props: {
  date: Date | string
  secondary?: string
  severity?: number
  showSeverity: boolean
  onClick: () => void
  onDelete: () => Promise<void>
  onSetNow?: () => Promise<void>
  severityColorMapping?: (severity: number) => string
}) {
  const [swiped, setSwiped] = useState(false)
  const onDelete = async () => await props.onDelete()
  
  return (
    <SwipeableListItem
      threshold={0.5}
      trailingActions={swipeDeleteItem(onDelete)}
      onSwipeStart={() => setSwiped(true)}
      {...(props.onSetNow && { leadingActions: swipeSetNow(props.onSetNow) })}
    >
      <ListItem
        sx={{
          ":hover": {
            cursor: "pointer",
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }} 
        onClick={() => { 
          if (swiped) {
            setSwiped(false)
            return
          }
          props.onClick()
        }}
      >
        <ListItemText
          primary={typeof(props.date) == "string" ? props.date : formatDate(props.date, "withTime")}
          secondary={props.secondary}
        />
        {props.showSeverity && props.severity !== undefined
        && (
          <ListItemIcon title="Schwere">
            <Icons.circle
              sx={{ color: props.severityColorMapping(props.severity) }}
              data-testid="circle-icon"
            />
            {" "}
          </ListItemIcon>
        )}
      </ListItem>
    </SwipeableListItem>
  )
}

