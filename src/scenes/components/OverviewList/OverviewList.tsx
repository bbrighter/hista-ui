import "react-swipeable-list/dist/styles.css";

import CircularProgress from "@mui/material/CircularProgress"
import { useState } from "react"
import {  SwipeableList } from "react-swipeable-list"

import { usePiidEffect } from "../../../hooks/usePiidEffect"
import { OverviewListItem } from "./OverviewListItem";

interface ListItemInterface {
  id: number
  date: Date | string
  secondary?: string
  severity?: number
}

export function OverviewList(props: {
  items: Array<ListItemInterface>
  showSeverity?: boolean
  onClick: (id: number) => void
  onDelete: (id: number) => Promise<void>
  getData: () => Promise<void | Array<unknown>>
  severityColorMapping?: (severity: number) => string
  onSetNow?: (id: number) => Promise<void>
}) {
  const [loading, setLoading] = useState(false)
  const { items, showSeverity, onClick, onDelete, getData, severityColorMapping, onSetNow } = props

  usePiidEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getData()
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      {loading && <CircularProgress sx={{ position: "absolute", left: "50%", top: "50%" }} />}
      <SwipeableList>
        {items.map(i => (
          <OverviewListItem
            key={i.id}
            date={i.date}
            onClick={() => onClick(i.id)}
            onDelete={() => onDelete(i.id)}
            showSeverity={showSeverity}
            severity={i.severity}
            secondary={i.secondary}
            severityColorMapping={severityColorMapping}
            {...(onSetNow && { onSetNow: () => onSetNow(i.id) } )}
          />
        ))}
      </SwipeableList>
    </>
  )
}




