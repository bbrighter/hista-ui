import { PieChart } from "@mui/x-charts/PieChart";

import { Nutrition } from "../../store";

export const NUTRITION_COLORS = ["#4A90E2", "#F4C542", "#4CAF50", "#b12323"]


export const NutritionChart = ({ nutrition, hideFiber } : {nutrition: Nutrition, hideFiber?: boolean}) => {
  const colors = NUTRITION_COLORS
  const data = [ { id: 0, value: nutrition.carbohydrate, label: "Kohlenhydrate", color: colors[0] },
    { id: 1, value: nutrition.fat, label: "Fett", color: colors[1] },
    { id: 3, value: nutrition.protein, label: "Eiweiß", color: colors[3] },
  ]
  if (!hideFiber) {
    data.push({ id: 2, value: nutrition.fiber, label: "Ballaststoffe", color: colors[2] })
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
      height={200}
      hideLegend
    />
  )
}