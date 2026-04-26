import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import List from "@mui/material/List"
import { useMemo, useState } from "react"

import { usePiidEffect } from "../../hooks/usePiidEffect"
import { ingredientsService, selectIsLoadingAny, useAllIngredients, useNonArchivedIngredients } from "../../store"
import useHista from "../../store/store"
import { Loading } from "../components"
import { IngredientListItem, ToggleVisibility } from "./IngredientListItem"

export const IngredientManagement = () => {
  const isLoading = useHista(selectIsLoadingAny(["ingredients"]))
  const [showArchived, setShowArchived] = useState(true)
  const ingredients = useAllIngredients()
  const nonArchivedIngredients = useNonArchivedIngredients()

  const showIngredients = useMemo(() => showArchived ? nonArchivedIngredients : ingredients, [ingredients, nonArchivedIngredients, showArchived])


  usePiidEffect(() => {
    ingredientsService.getIngredients()
  }, [])

  return (
    <Loading show={isLoading}>
      <Container>
        <Box display="flex" justifyContent="end"> 
          <ToggleVisibility checked={!showArchived} onChange={() => setShowArchived(!showArchived)}/>
        </Box>
        <List>
          {showIngredients.map(i => (
            <IngredientListItem
              key={i.id}
              {...i}
            />
          ))}
        </List>
      </Container>
    </Loading>
  )
}
