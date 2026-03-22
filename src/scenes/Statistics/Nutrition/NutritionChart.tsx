import { PieChart } from "@mui/x-charts/PieChart";

import { Nutrition } from "../../../store";
import { NUTRITION_COLORS } from "./NutritionLegend";


export const NutritionChart = (nutrition: Nutrition) => {
  const colors = NUTRITION_COLORS
  return (
    <PieChart
      series={[
        { data: [
          { id: 0, value: nutrition.carbohydrate, label: "Kohlenhydrate", color: colors[0] },
          { id: 1, value: nutrition.fat, label: "Fett", color: colors[1] },
          { id: 2, value: nutrition.fiber, label: "Ballaststoffe", color: colors[2] },
          { id: 3, value: nutrition.protein, label: "Eiweiß", color: colors[3] },
        ],
        arcLabel: "formattedValue",
        valueFormatter: (v) => v.value.toLocaleString("de-DE", { 
          maximumFractionDigits: 1, 
          unit: "gram",
          style: "unit",
        }),
        },
      ]}
      height={200}
      hideLegend
    />
  )
}