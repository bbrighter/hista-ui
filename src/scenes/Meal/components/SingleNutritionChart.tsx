import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { computeCalories } from "../../../utils/nutrition";
import { HideFiberButton, NutritionChart, NutritionChartProps } from "../../components/NutritionChart";

type ChartProps = NutritionChartProps & {isLoading: boolean}

export const SingleNutritionChart = ({ nutrition, isLoading }: ChartProps) => {
  const [hideFiber, setHideFiber] = useState(true)

  return (
    <>
      {isLoading ? <CircularProgress/> : 
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 500 }}>
          <HideFiberButton value={hideFiber} onClick={() => setHideFiber(!hideFiber)}/>
          <NutritionChart 
            nutrition={nutrition} 
            hideFiber={hideFiber} 
            showLegend
          />
          <Typography>{computeCalories(nutrition)}</Typography>
        </Box>
      }
    </>       
  )
            
}