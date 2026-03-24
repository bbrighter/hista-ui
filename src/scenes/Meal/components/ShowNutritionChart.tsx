import CloseIcon from "@mui/icons-material/Close";
import PieChartIcon from "@mui/icons-material/PieChart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react"

import { statisticsService } from "../../../store"
import useHista from "../../../store/store";
import { SingleNutritonChart } from "./SingleNutritionChart";
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
        open={open} 
        onClose={() => setOpen(false)}
        fullScreen
      >
        <AppBar >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">{mealDate.toLocaleDateString("de-DE")}</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}> 
          <SingleNutritonChart nutrition={nutrition} isLoading={isLoading}/>
        </DialogContent>
      </Dialog>
    </Box>
  )
}