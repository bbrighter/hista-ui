import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

export const NUTRITION_COLORS = ["#4A90E2", "#F4C542", "#4CAF50", "#D64545"]

const NUTRITION_LEGEND = [
  { id: 0, label: "Kohlenhydrate", color: NUTRITION_COLORS[0] },
  { id: 1, label: "Fett", color: NUTRITION_COLORS[1] },
  { id: 2, label: "Ballaststoffe", color: NUTRITION_COLORS[2] },
  { id: 3, label: "Eiweiß", color: NUTRITION_COLORS[3] },
]


export const NutritionLegend = () => {
  return (
    <Paper 
      sx={{ my: 2, display: "flex", gap: 2, flexWrap: "wrap", px: 1 }}>
      {NUTRITION_LEGEND.map(item => (
        <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: "1rem", height: "1rem", backgroundColor: item.color, borderColor: "ButtonBorder", mb: "4px" }} />
          <Typography fontSize="1rem">{item.label}</Typography>
        </Box>
      ))}
    </Paper>
  )
}