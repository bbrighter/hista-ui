import { PieChart } from "@mui/x-charts/PieChart";

import { Nutrition } from "../../../store";

export const NutritionChart = (nutrition: Nutrition) => {
  return (
    <PieChart
      series={[
        { data: [
          { id: 0, value: nutrition.carbohydrate, label: "Kohlenhydrate" },
          { id: 1, value: nutrition.fat, label: "Fett" },
          { id: 2, value: nutrition.fiber, label: "Ballaststoffe" },
          { id: 3, value: nutrition.protein, label: "Eiweiß" },
        ] },
      ]}
      height={200}
    />
  )
}