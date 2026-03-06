import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import {  LeadingActions, SwipeAction, TrailingActions } from "react-swipeable-list"

import { mealConstants } from "../../../constants"
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

export const swipeToggleFoodCondition = (food: Food) => {
  const newCondition = food.condition == "cooked" ? "raw" : "cooked"

  const onSwipe = () => {
    mealService.patchFoodCondition(food.id, newCondition)
  }

  return (
    <LeadingActions>
      <SwipeAction onClick={onSwipe}>
        <Button 
          data-testid="toggle-food-condition-button"
          variant="contained"
          color={newCondition == "cooked" ? "secondary" : "primary"}
        >
          {newCondition == "cooked" ? mealConstants.COOKED : mealConstants.RAW}
        </Button>
      </SwipeAction>
    </LeadingActions>)
}