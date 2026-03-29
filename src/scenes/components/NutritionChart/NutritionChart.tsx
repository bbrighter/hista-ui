import Box from "@mui/material/Box";
import { ChartsDataProvider } from "@mui/x-charts/ChartsDataProvider";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { ChartsSurface } from "@mui/x-charts/ChartsSurface";
import { PiePlot } from "@mui/x-charts/PieChart";
import { useEffect, useRef, useState } from "react";

import { Nutrition } from "../../../store";
import { NUTRITION_COLORS } from "./nutritionColors";

export type NutritionChartProps = {
  nutrition: Nutrition
  hideFiber?: boolean
  showLegend?: boolean
}

export const NutritionChart = ({ nutrition, hideFiber, showLegend } : NutritionChartProps) => {
  const [size, setSize] = useState(300)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        setSize(ref.current.offsetWidth)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("reize", update)
  })

  const colors = NUTRITION_COLORS
  const data = [ 
    { id: 1, value: nutrition.fat, label: "Fett", color: colors[1] },
    { id: 2, value: nutrition.protein, label: "Eiweiß", color: colors[3] },
    { id: 3, value: nutrition.carbohydrate, label: "Kohlenhydrate", color: colors[0] },    
  ]
  if (!hideFiber) {
    data.push({ id: 4, value: nutrition.fiber, label: "Ballaststoffe", color: colors[2] })
  }

  return (
    <Box
      data-testid="boxbox"
      ref={ref}
      sx={ { width: "100%",  aspectRatio: "1 / 1", margin: "0 auto" }}
    >
      <ChartsDataProvider 
        width={size}
        height={size}
        series={[
          { 
            type: "pie",
            data: data,
            arcLabel: "formattedValue",
            valueFormatter: (v) => v.value.toLocaleString("de-DE", { maximumFractionDigits: 1 }),
          },
        ]}
      >
        {showLegend && <ChartsLegend/>}
        <ChartsSurface>
          <PiePlot skipAnimation/>
        </ChartsSurface>
      </ChartsDataProvider>
    </Box>
    
  )
}