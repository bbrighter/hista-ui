import "react-swipeable-list/dist/styles.css";

import CircularProgress from "@mui/material/CircularProgress"
import { useState } from "react"
import {  SwipeableList } from "react-swipeable-list"

import { usePiidEffect } from "../../../hooks/usePiidEffect"
import { OverviewListItem } from "./OverviewListItem";

interface ListItemInterface {
  id: number
  date: Date
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

  usePiidEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      props.getData()
      setLoading(false)
    }
    fetchData()
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




