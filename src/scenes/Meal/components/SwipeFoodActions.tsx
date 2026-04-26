import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import {  SwipeAction, TrailingActions } from "react-swipeable-list"

import { Food, mealService } from "../../../store"

export const swipeDeleteFood = (food: Food) => {

  const onDelete = async () => {
    await mealService.deleteFood(food.id)
  }

  return (  
    <TrailingActions>
      <SwipeAction
        onClick={onDelete}
        destructive
      >
        <Button
          data-testid="delete-food-button"
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        />
      </SwipeAction>
    </TrailingActions>
  
  )
}
