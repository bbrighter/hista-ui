import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"

import { actions } from "../../../actions"
import useHista from "../../../store/store"
import { computeCalories } from "../../../utils/nutrition"
import { HideFiberButton } from "../../components/NutritionChart"
import { NutritionChart } from "../../components/NutritionChart/NutritionChart"
import { formatDateBasedOnInterval } from "./formatDate"
import { NutritionLegend } from "./NutritionLegend"
import { ToggleInterval } from "./ToggleInterval"


export const NutritionStats = () => {
  const nutrition = useHista(state => state.nutritionStatistics.statistics)
  const [interval, setInterval] = useState<"day" | "week" | "month" | "quarter">("day")
  const [hideFiber, setHideFiber] = useState(true)
  const onToggle = (_: React.MouseEvent<HTMLElement>, newValue: "day" | "week" | "month" | "quarter") => {
    setInterval(newValue)
  }

  useEffect(() => {
    actions.statistics.getNutritionStatistics(interval)
  }, [interval])

  const width = 500

  return (
    <Box>
      <ToggleInterval value={interval} onChange={onToggle} />
      <Paper sx={{ display: "flex", justifyContent: "space-between" }}>
        <NutritionLegend hideFiber={hideFiber}/>
        <HideFiberButton onClick={() => setHideFiber(!hideFiber)} value={hideFiber}/>
      </Paper>
      <List>
        {nutrition.map(n => (
          <ListItem key={n.date.toString()} sx={{  width: "100%", maxWidth: width+50 }}>
            <Box sx={{ width: "100%" }}>
              <Typography>{formatDateBasedOnInterval(n.date, interval)}</Typography>
              <Typography variant="caption">{computeCalories(n.nutrition)}</Typography>
              <NutritionChart 
                nutrition={n.nutrition} 
                hideFiber={hideFiber}
              />
            </Box>
          </ListItem>))}
      </List>
    </Box>
  )
}

