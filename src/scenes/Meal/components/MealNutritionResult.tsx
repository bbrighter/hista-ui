import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { useTotalMealNutrition } from "../../../store"

export const MealNutritionResult = () => {
  const nutrition = useTotalMealNutrition()

  const indicators = [
    { label: "Fett", value: nutrition.fat },
    { label: "Kohlenhydrate", value: nutrition.carbohydrate },
    { label: "Ballaststoffe", value: nutrition.fiber },
    { label: "Eiweiß", value: nutrition.protein },
  ]

  return (
    <Paper 
      data-testid="nutrition-kpis"
      sx={{ px: "0.5rem", py: "0.25rem", mb: "1rem" }} 
    >
      <Grid container columnGap={2} direction="row" justifyContent="space-between">
        {indicators.map((i) => (
          <Grid key={i.label} size={{ xs: 4, md: 2 }}>
            <Stack direction="row" spacing={0.5} justifyContent="space-between">
              <Typography color="textDisabled">
                {i.label}
              </Typography>
              <Typography sx={{ whiteSpace: "nowrap" }} >
                {i.value.toLocaleString("de-DE", { maximumFractionDigits: 1 })} g
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}