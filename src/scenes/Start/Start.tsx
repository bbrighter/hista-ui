import Grid from "@mui/material/Grid"
import dayjs from "dayjs"
import { useEffect } from "react"

import { statusService, useStatusExistsOnDay } from "../../store"
import StartPageCard, { CardType } from "./components/StartPageCard"

export default function Start() {
  const types: Array<CardType> = [
    "status",
    "meals",
    "medicines",
    "conditionEvents",
    "headaches",
    "notes",
    "pollens",
    "statistics",
  ]

  useEffect(() => {
    statusService.getStatuses()
  },[])

  const statusForTodayExists = useStatusExistsOnDay(dayjs())
  const highlight = (t: CardType) => t == "status" && !statusForTodayExists

  return (
    <Grid
      justifyContent="center"
      container
      spacing={2}
      sx={{ padding: "2rem" }}
    >
      {types.map(t => (<StartPageCard key={t} type={t} highlight={highlight(t)}/>))}
    </Grid>
  )
}
