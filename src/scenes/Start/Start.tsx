import Grid from "@mui/material/Grid"
import dayjs from "dayjs"

import { actions } from "../../actions"
import { usePiidEffect } from "../../hooks/usePiidEffect"
import { useStatusExistsOnDay } from "../../store"
import useHista from "../../store/store"
import StartPageCard, { CardType } from "./components/StartPageCard"

export default function Start() {
  const piid = useHista(state => state.piid)
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

  usePiidEffect(() => {
    console.log(`Triggering usePiidEffect with piid ${piid}`)
    actions.status.list()
  },[])

  const statusForTodayExists = useStatusExistsOnDay(dayjs())
  const highlight = (t: CardType) => t == "status" && !statusForTodayExists

  return (
    <Grid
      container
      spacing={2}
      sx={{ 
        padding: "2rem",
        justifyContent: "center",
      }}
    >
      {types.map(t => (<StartPageCard key={t} type={t} highlight={highlight(t)}/>))}
    </Grid>
  )
}
