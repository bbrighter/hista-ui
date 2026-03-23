import CloseIcon from "@mui/icons-material/Close";
import PieChartIcon from "@mui/icons-material/PieChart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react"
import React from "react";

import { Nutrition, statisticsService } from "../../../store"
import useHista from "../../../store/store";
import { HideFiberButton } from "../../components/NutritionChart";
import { NutritionChart } from "../../components/NutritionChart/NutritionChart"
import { useMealDaysNutrition } from "./useMealDaysNutrition"

export const ShowNutritionChart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [hideFiber, setHideFiber] = useState(true)
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

  const computeCalories = (n: Nutrition): string => {
    const calories = n.protein * 4 + n.carbohydrate * 4 + n.fat * 9
    return calories.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " kcal"
  }

  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}><PieChartIcon/></IconButton>
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        fullScreen
        slots={{ transition: Transition }}
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
        
          {isLoading ? <CircularProgress/> : 
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <HideFiberButton value={hideFiber} onClick={() => setHideFiber(!hideFiber)}/>
              <NutritionChart nutrition={nutrition} hideFiber={hideFiber}/>
              <Typography>{computeCalories(nutrition)}</Typography>
            </Box>}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
