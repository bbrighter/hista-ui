import Container from "@mui/material/Container"
import List from "@mui/material/List"

import { usePiidEffect } from "../../hooks/usePiidEffect"
import { ingredientsService } from "../../store"
import useHista from "../../store/store"
import { IngredientListItem } from "./IngredientListItem"

export const IngredientManagement = () => {
  const ingredients = useHista(state => state.ingredients)
  const sortedIngredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name))

  usePiidEffect(() => {
    ingredientsService.getIngredients()
  }, [])

  return (
    <Container>
      <List>
        {sortedIngredients.map(i => (
          <IngredientListItem
            key={i.id}
            {...i}
          />
        ))}
      </List>
    </Container>
  )
}
