import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { Nutrition } from "../../../store";
import { computeCalories } from "../../../utils/nutrition";
import { HideFiberButton, NutritionChart } from "../../components/NutritionChart";

export const SingleNutritonChart = ({ nutrition, isLoading }: {nutrition: Nutrition, isLoading: boolean}) => {
  const [hideFiber, setHideFiber] = useState(true)


  return (
    <>
      {isLoading ? <CircularProgress/> : 
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <HideFiberButton value={hideFiber} onClick={() => setHideFiber(!hideFiber)}/>
          <NutritionChart nutrition={nutrition} hideFiber={hideFiber}/>
          <Typography>{computeCalories(nutrition)}</Typography>
        </Box>
      }
    </>       
  )
            
}