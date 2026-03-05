import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import {  LeadingActions, SwipeAction, TrailingActions } from "react-swipeable-list"

import { mealConstants } from "../../../constants"
import { FoodCondition, mealService } from "../../../store"

type ID = {id: number}

export const swipeDeleteFood = ({ id }: ID) => {

  const onDelete = async () => {
    await mealService.deleteFood(id)
  }

  return (  
    <TrailingActions>
      <SwipeAction
        onClick={onDelete}
        destructive
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        />
      </SwipeAction>
    </TrailingActions>
  
  )
}

export const swipeToggleFoodCondition = ({ id, condition }: ID & {condition: FoodCondition}) => {
  const newCondition = condition == "cooked" ? "raw" : "cooked"

  const onSwipe = () => {
    mealService.patchFoodCondition(id, newCondition)
  }

  return (
    <LeadingActions>
      <SwipeAction onClick={onSwipe}>
        <Button 
          variant="contained"
          color={newCondition == "cooked" ? "warning" : "primary"}
        >
          {newCondition == "cooked" ? mealConstants.COOKED : mealConstants.RAW}
        </Button>
      </SwipeAction>
    </LeadingActions>)
}