import PieChartIcon from "@mui/icons-material/PieChart";
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react"

import { statisticsService } from "../../../store"
import useHista from "../../../store/store";
import { NutritionChart } from "../../components/NutritionChart"
import { useMealDaysNutrition } from "./useMealDaysNutrition"

export const ShowNutritionChart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const mealDate = useHista(state => state.meal.date)
  const nutrition = useMealDaysNutrition()

  const mealDayJs = useMemo(() => dayjs(mealDate), [mealDate])

  useEffect(() => {
    if (!open) return
    setIsLoading(true)
    statisticsService.getNutritionStatistics(
      "day", 
      mealDayJs.startOf("day").toDate(), 
      mealDayJs.endOf("day").toDate(),
    ).finally(() => setIsLoading(false))
  }, [open, mealDayJs])


  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}><PieChartIcon/></IconButton>
      <Dialog 
        open={open} onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DialogContent> 
          {isLoading ? <CircularProgress/> : <NutritionChart nutrition={nutrition}/>}
        </DialogContent>
      </Dialog>
    </Box>
  )


}