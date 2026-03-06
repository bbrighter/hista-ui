import { NumberFieldRootChangeEventDetails } from "@base-ui/react/number-field"
import Button from "@mui/material/Button"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { SwipeableListItem } from "react-swipeable-list"

import { mealConstants } from "../../../constants"
import useDebounce from "../../../hooks/useDebounce"
import { useDidUpdateEffect } from "../../../hooks/useDidUpdateEffect"
import { Food, mealService } from "../../../store"
import NumberField from "../../components/NumberField"
import { swipeDeleteFood, swipeToggleFoodCondition } from "./SwipeFoodActions"

export function FoodItem({ food }: {food: Food}) {
  const [amount, setAmount] = useState<number | null>(food.amount ?? null)
  const [isPatchAmountLoading, setIsPatchAmountLoading] = useState<number | undefined>()
  const debouncedInputValue = useDebounce(amount, 1000)


  useDidUpdateEffect(() => {
    setIsPatchAmountLoading(food.id)
    mealService.patchFoodAmount(food.id, amount).finally(() => {
      setIsPatchAmountLoading(undefined)
    })
  }, [debouncedInputValue])


  const onAmountChange = (value: number, eventDetails: NumberFieldRootChangeEventDetails) => {
    if (eventDetails.reason == "input-clear") {
      setAmount(null)
    } else {
      setAmount(value)
    }
  }


  return (
    <SwipeableListItem 
      threshold={0.5}
      trailingActions={swipeDeleteFood(food)}
      leadingActions={swipeToggleFoodCondition(food)}
    >
      <ListItem sx={{ pl: "8px", pr: "8px" }}>
        <ListItemText>
          <Typography noWrap>
            {food.ingredientName}
          </Typography>
        </ListItemText>
        <NumberField
          sx={{ width: "50px" }}
          size="small"
          unit="g"
          min={0}
          value={amount}
          onValueChange={onAmountChange}       
          loading={isPatchAmountLoading == food.id}        
        />
        <Button 
          data-testid="food-condition-chip"
          sx={{ ml: "4px", 
            borderColor: (theme) => food.condition == "raw" ? theme.palette.primary.main : theme.palette.secondary.main , 
            color: (theme) => theme.palette.grey[500],
          }}
          variant="outlined"
        >
          {food.condition == "raw" ? mealConstants.RAW : mealConstants.COOKED}
        </Button>
      </ListItem>
    </SwipeableListItem>
  )
}


