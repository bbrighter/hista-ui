import Grid from "@mui/material/Grid"
import dayjs from "dayjs"
import { useState } from "react"

import { IngredientChart, StatisticsDateInput } from "./components"

export function Charts() {
  const today = new Date()
  const [fromDate, setFromDate] = useState(new Date("2024-05-10"))
  const [toDate, setToDate] = useState(today)

  const handleFromDateChange = (value: dayjs.Dayjs | null) => {
    if (value != null) setFromDate(new Date(value.toISOString()))
  }

  const handleToDateChange = (value: dayjs.Dayjs | null) => {
    if (value != null) setToDate(new Date(value.toISOString()))
  }

  return (
    <Grid container sx={{ mt: 2 }}>
      <StatisticsDateInput
        fromDate={fromDate}
        toDate={toDate}
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange}
      />
      <IngredientChart
        from={fromDate}
        to={toDate}
      />
    </Grid>
  )
}
