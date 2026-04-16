import Container from "@mui/material/Container"

import { MealButtonGroup } from "./components"
import MealList from "./components/MealList"

export default function Meals() {


  return (
    <Container sx={{ padding: "2rem" }}>
      <MealButtonGroup/>
      <MealList />
    </Container>
  )
}
