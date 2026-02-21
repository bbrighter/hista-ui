import Container from "@mui/material/Container"
import List from "@mui/material/List"
import { useEffect } from "react"

import { ingredientsService } from "../../store"
import useHista from "../../store/store"
import { IngredientListItem } from "./IngredientListItem"

export const IngredientManagement = () => {
  const ingredients = useHista(state => state.ingredients)
  const sortedIngredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name))

  useEffect(() => {
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
