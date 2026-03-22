import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"

import { Nutrition, statisticsService } from "../../../store"
import useHista from "../../../store/store"
import { formatDateBasedOnInterval } from "./formatDate"
import { HideFiberButton } from "./HideFiberButton"
import { NutritionChart } from "./NutritionChart"
import { NutritionLegend } from "./NutritionLegend"
import { ToggleInterval } from "./ToggleInterval"


export const NutritionStats = () => {
  const nutrition = useHista(state => state.nutrutionStatistics.statistics)
  const [interval, setInterval] = useState<"day" | "week" | "month" | "quarter">("day")
  const [hideFiber, setHideFiber] = useState(true)
  const onToggle = (_: React.MouseEvent<HTMLElement>, newValue: "day" | "week" | "month" | "quarter") => {
    setInterval(newValue)
  }

  useEffect(() => {
    statisticsService.getNutritionStatistics(interval)
  }, [interval])

  const computeCalories = (n: Nutrition): string => {
    const calories = n.protein * 4.1 + n.carbohydrate * 4.1 + n.fat * 9.3
    return calories.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " kcal"

  }

  return (
    <Box>
      <ToggleInterval value={interval} onChange={onToggle} />
      <Paper sx={{ display: "flex", justifyContent: "space-between" }}>
        <NutritionLegend hideFiber={hideFiber}/>
        <HideFiberButton onClick={() => setHideFiber(!hideFiber)} value={hideFiber}/>
      </Paper>
      <List>
        {nutrition.map(n => (
          <ListItem key={n.date.toString()} sx={{ height: 200 }}>
            <Box>
              <Typography>{formatDateBasedOnInterval(n.date, interval)}</Typography>
              <Typography variant="caption">{computeCalories(n.nutrition)}</Typography>  
            </Box>
            <NutritionChart nutrition={n.nutrition} hideFiber={hideFiber} />
          </ListItem>))}
      </List>
    </Box>
  )
}

