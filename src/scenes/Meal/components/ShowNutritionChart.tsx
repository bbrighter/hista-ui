import PieChartIcon from "@mui/icons-material/PieChart";
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import { useEffect, useState } from "react"

import { statisticsService } from "../../../store"
import { NutritionChart } from "../../components/NutritionChart"
import { useMealDaysNutrition } from "./useMealDaysNutrition"

export const ShowNutritionChart = () => {
  const [open, setOpen] = useState(false)
  const nutrition = useMealDaysNutrition()

  useEffect(() => {
    statisticsService.getNutritionStatistics("day")
  }, [])


  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}><PieChartIcon/></IconButton>
      <Dialog 
        open={open} onClose={() => setOpen(false)}
        sx={{ width: "80%" }}
      >
        <DialogContent>
          <NutritionChart nutrition={nutrition}/>
        </DialogContent>
      </Dialog>
    </Box>
  )


}