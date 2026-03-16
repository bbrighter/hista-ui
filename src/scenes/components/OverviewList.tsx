import "react-swipeable-list/dist/styles.css";

import styled from "@emotion/styled"
import CircleIcon from "@mui/icons-material/Circle"
import DeleteIcon from "@mui/icons-material/Delete"
import TodayIcon from "@mui/icons-material/Today";
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useState } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"

import { usePiidEffect } from "../../hooks/usePiidEffect"
import { formatDate } from "../../utils/formatDate"

interface ListItemInterface {
  id: number
  date: Date
  severity?: number
}

export default function OverviewList(props: {
  items: Array<ListItemInterface>
  showSeverity?: boolean
  onClick: (id: number) => void
  onDelete: (id: number) => Promise<void>
  getData: () => Promise<void | Array<unknown>>
  severityColorMapping?: (severity: number) => string
  onSetNow?: (id: number) => Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  usePiidEffect(() => {
    setLoading(true)
    props.getData().finally(
      () => setLoading(false),
    )
  }, [])

  return (
    <>
      {loading && <CircularProgress sx={{ position: "absolute", left: "50%", top: "50%" }} />}
      <SwipeableList>
        {props.items.map(i => (
          <OverviewListItem
            key={i.id}
            date={i.date}
            onClick={() => props.onClick(i.id)}
            onDelete={() => props.onDelete(i.id)}
            showSeverity={props.showSeverity}
            severity={i.severity}
            severityColorMapping={props.severityColorMapping}
            onSetNow={() => props.onSetNow(i.id)}
          />
        ))}
      </SwipeableList>
    </>
  )
}

function OverviewListItem(props: {
  date: Date
  secondary?: string
  severity?: number
  showSeverity: boolean
  onClick: () => void
  onDelete: () => Promise<void>
  onSetNow?: () => Promise<void>
  severityColorMapping?: (severity: number) => string
}) {
  const [swiped, setSwiped] = useState(false)
  const onDelete = async () => {
    await props.onDelete()
  }

  return (
    <SwipeableListItem
      threshold={0.75}
      trailingActions={swipeDeleteItem(onDelete)}
      onSwipeStart={() => setSwiped(true)}
      leadingActions={props.onSetNow ? swipeSetNow(props.onSetNow) : undefined}
    >
      <StyledListItem 
        onClick={() => { 
          if (swiped) {
            setSwiped(false)
            return
          }
          props.onClick()
        }}
      >
        <ListItemText
          primary={formatDate(props.date, "withTime")}
          secondary={props.secondary}
        />
        {props.showSeverity && props.severity !== undefined
        && (
          <ListItemIcon title="Schwere">
            <CircleIcon
              sx={{ color: props.severityColorMapping(props.severity) }}
              data-testid="circle-icon"
            />
            {" "}
          </ListItemIcon>
        )}
      </StyledListItem>
    </SwipeableListItem>
  )
}

const StyledListItem = styled(ListItem)`
:hover{
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
}
`


const swipeDeleteItem = (onDelete: () => Promise<void>) => {
  return (
    <TrailingActions>
      <SwipeAction 
        onClick={onDelete} 
        destructive
      >
        <Button
          data-testid="delete-button"
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        />
      </SwipeAction>
    </TrailingActions>
  )

}

const swipeSetNow = (onSwipe: () => Promise<void>) => {
  return (
    <LeadingActions>
      <SwipeAction onClick={onSwipe}>
        <Button
          data-testid="set-now-button"
          variant="contained"
          startIcon={<TodayIcon />}
          color="secondary"
        >Jetzt</Button>  
      </SwipeAction>
    </LeadingActions>
  )

}