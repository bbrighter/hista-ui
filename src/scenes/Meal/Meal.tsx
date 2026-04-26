import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import { useParams } from "react-router-dom"

import { usePiidEffect } from "../../hooks/usePiidEffect"
import { mealService, selectIsLoadingAny } from "../../store"
import useHista from "../../store/store"
import { Loading } from "../components"
import { AddFood, FoodList, MealNutritionResult, MealSettings, ShowNutritionChart } from "./components"

export default function Meal() {
  const isLoading = useHista(selectIsLoadingAny(["ingredients", "templates", "meal"]))
  const params = useParams<{ mealId: string }>()

  usePiidEffect(() => {
    mealService.getMeal(Number(params.mealId))
  }, [params.mealId])

  return (
    <Loading show={isLoading}>
      <Container sx={{ padding: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MealNutritionResult/>
          <ShowNutritionChart/>
        </Box>
        <FormGroup>
          <MealSettings />
          <FormControl>
            <AddFood />
          </FormControl>
        </FormGroup>
        <FoodList />
      </Container>
    </Loading>
  )
}
