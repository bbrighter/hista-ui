import Container from "@mui/material/Container"

import { selectIsLoadingAny } from "../../store"
import useHista from "../../store/store"
import { Loading } from "../components"
import { MealButtonGroup } from "./components"
import MealList from "./components/MealList"

export default function Meals() {
  const isLoading = useHista(selectIsLoadingAny(["meals"]))

  return (
    <Loading show={isLoading}>
      <Container sx={{ padding: "2rem" }}>
        <MealButtonGroup/>
        <MealList />
      </Container>
    </Loading>
  )
}
