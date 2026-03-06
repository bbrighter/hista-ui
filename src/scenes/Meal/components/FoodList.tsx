import "react-swipeable-list/dist/styles.css";

import { SwipeableList } from "react-swipeable-list"

import useHista from "../../../store/store"
import { FoodItem } from "./FoodItem"

export function FoodList() {
  const food = useHista(state => state.meal.foods)

  return (
    <SwipeableList>
      {food.map(f => (
        <FoodItem food={f} key={f.id}/>
      ))}
    </SwipeableList>
  )
}
