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
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react"
import React from "react";

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
        open={open} 
        onClose={() => setOpen(false)}
        fullScreen
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}> 
          {isLoading ? <CircularProgress/> : <NutritionChart nutrition={nutrition}/>}
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
  return <Slide direction="up" ref={ref} {...props} />;
});
