import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

export const NUTRITION_COLORS = ["#4A90E2", "#F4C542", "#4CAF50", "#b12323"]




export const NutritionLegend = ({ hideFiber }: {hideFiber: boolean}) => {
  const nutrition_legend = [
    { id: 0, label: "K", color: NUTRITION_COLORS[0] },
    { id: 1, label: "F", color: NUTRITION_COLORS[1] },
    { id: 3, label: "E", color: NUTRITION_COLORS[3] },
  ]

  if (!hideFiber) {
    nutrition_legend.push({ id: 2, label: "B", color: NUTRITION_COLORS[2] })
  }

  return (
    <Paper elevation={3}
      sx={{ display: "flex", gap: 2, flexWrap: "wrap" , px: 1 }}>
      {nutrition_legend.map(item => (
        <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: "1rem", height: "1rem", backgroundColor: item.color, borderColor: "ButtonBorder", mb: "4px" }} />
          <Typography fontSize="1rem">{item.label}</Typography>
        </Box>
      ))}
    </Paper>
  )
}