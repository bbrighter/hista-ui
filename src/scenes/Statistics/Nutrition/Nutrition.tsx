import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"

import { statisticsService } from "../../../store"
import useHista from "../../../store/store"
import { formatDateBasedOnInterval } from "./formatDate"
import { NutritionChart } from "./NutritionChart"
import { ToggleInterval } from "./ToggleInterval"

export const Nutrition = () => {
  const nutrition = useHista(state => state.nutrutionStatistics.statistics)
  const [interval, setInterval] = useState<"day" | "week" | "month" | "quarter">("day")
  const onToggle = (_: React.MouseEvent<HTMLElement>, newValue: "day" | "week" | "month" | "quarter") => {
    setInterval(newValue)
  }

  useEffect(() => {
    statisticsService.getNutritionStatistics(interval)
  }, [interval])

  return (
    <Box>
      <ToggleInterval value={interval} onChange={onToggle} />
      <List>
        {nutrition.map(n => (
          <ListItem key={n.date.toString()} sx={{ height: 200 }}>
            <Typography>{formatDateBasedOnInterval(n.date, interval)}</Typography>
            <NutritionChart {...n.nutrition}/>
          </ListItem>))}
      </List>
    </Box>
  )
}