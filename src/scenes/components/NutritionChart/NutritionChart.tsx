import { PieChart } from "@mui/x-charts/PieChart";

import { Nutrition } from "../../../store";
import { NUTRITION_COLORS } from "./nutritionColors";

export type NutritionChartProps = {
  nutrition: Nutrition
  height?: number
  hideFiber?: boolean
}

export const NutritionChart = ({ nutrition, hideFiber, height } : NutritionChartProps) => {
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
    <PieChart
      series={[
        { data: data,
          arcLabel: "formattedValue",
          valueFormatter: (v) => v.value.toLocaleString("de-DE", { 
            maximumFractionDigits: 1, 
          }),
        },
      ]}
      height={height ? height : 300}
      width={typeof window !== "undefined" ? window.innerWidth - 32 : height}
      hideLegend
      skipAnimation
    />
  )
}