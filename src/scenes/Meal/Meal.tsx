import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import Skeleton from "@mui/material/Skeleton"
import { useParams } from "react-router-dom"

import { usePiidEffect } from "../../hooks/usePiidEffect"
import { mealService } from "../../store"
import useHista from "../../store/store"
import { AddFood, FoodList, MealNutritionResult, MealSettings } from "./components"

export default function Meal() {
  const isLoading = useHista(state => state.meal.isLoading)
  const params = useParams<{ mealId: string }>()

  usePiidEffect(() => {
    mealService.getMeal(Number(params.mealId))
  }, [])

  return (
    <Container sx={{ padding: "2rem" }}>
      <MealNutritionResult/>
      <FormGroup>
        <MealSettings />
        <FormControl>
          <AddFood />
        </FormControl>
      </FormGroup>
      {isLoading ? <Skeleton variant="rectangular" height="3rem" /> : <FoodList />}
    </Container>
  )
}
