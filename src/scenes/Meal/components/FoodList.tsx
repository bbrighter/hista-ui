import "react-swipeable-list/dist/styles.css";

import List from "@mui/material/List"
import { SwipeableList } from "react-swipeable-list"

import useHista from "../../../store/store"
import { FoodItem } from "./FoodItem"

export function FoodList() {
  const food = useHista(state => state.meal.foods)

  return (
    <SwipeableList>
      <List>
        {food.map(f => (
          <FoodItem food={f} key={f.id}/>
        ))}
      </List>
    </SwipeableList>
  )
}
