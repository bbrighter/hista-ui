import List from "@mui/material/List"

import useHista from "../../../store/store"
import { FoodItem } from "./FoodItem"

export function FoodList() {
  const food = useHista(state => state.meal.foods)

  return (
    <List>
      {food.map(f => (
        <FoodItem food={f} key={f.id}/>
      ))}
    </List>
  )
}
