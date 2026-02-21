import Grid from "@mui/material/Grid"

import StartPageCard, { CardType } from "./components/StartPageCard"

export default function Start() {
  const types: Array<CardType> = [
    "status",
    "meals",
    "headaches",
    "conditionEvents",
    "medicines",
    "notes",
    "pollens",
    "statistics",
  ]
  return (
    <Grid
      justifyContent="center"
      container
      spacing={2}
      sx={{ padding: "2rem" }}
    >
      {types.map(t => (<StartPageCard key={t} type={t} />))}
    </Grid>
  )
}
